#[tauri::command]
pub fn capture_screenshot(link: &str) -> (String, String) {
    let browser = headless_chrome::Browser::default().unwrap();
    let tab = browser.new_tab().unwrap();
    tab.navigate_to(link).unwrap();

        // Wait for the page navigation to complete
        tab.wait_until_navigated().unwrap();


    // Define a CSS selector for the element you want to wait for
    // let element_selector = ".prebet-match__teams__home"; // Change this selector to match your specific element

    // // Wait for the element to appear with a timeout
    // tab.wait_for_element(element_selector).unwrap();

    let screenshot_data = tab
        .capture_screenshot(headless_chrome::protocol::cdp::Page::CaptureScreenshotFormatOption::Png, None, None, true)
        .unwrap();

    // Define the path to the new directory within src/assets
    let new_directory_path = "../src/assets/images"; // Change this to your desired path
    
    // Define the full path to save the image
    let image_path = format!("{}/screenshot.png", new_directory_path);

    // Create the new directory if it doesn't exist
    std::fs::create_dir_all(&new_directory_path).unwrap();

    // Write the screenshot data to the output file in the new directory
    std::fs::write(&image_path, &screenshot_data).unwrap();
    
    let message = format!("Captured a screenshot of {}", link);

    (message, image_path)
}
