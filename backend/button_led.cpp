/**
 * @file button_led.cpp
 * @author Aditya
 * @brief This file handles the physical button functionality
 * @version 0.1
 * @date 2024-04-01
 * 
 * @copyright Copyright (c) 2024
 * 
 */
#include <iostream>
#include <pigpio.h>
#include <unistd.h> //for sleep and unsleep functions
#include <cstdlib> //For system command

#include <curl/curl.h> // for making HTTP requests


const int greenLED  = 18; // GPIO pin connected to the green LED
const int picButton = 25; // GPIO pin connected to the picture button
const int redLED = 17; // GPIO pin connected to the red LED
const int recButton = 27; // GPIO pin connected to the record button
const int powerButton = 23; // GPIO pin connected to the power button

/**
 * @brief Main functionality of the button led
 * 
 * @return int 
 */
int main() {
	if(gpioInitialise() < 0){
	   std::cerr <<"Initialization failed" << std::ends;
	   return 1;
	}

	
	gpioSetMode(greenLED, PI_OUTPUT); /// Set LED pin as output
	gpioWrite(greenLED, 0); /// Turn the LED off
	gpioSetMode(picButton, PI_PUD_UP); /// Set Button pin as input
	gpioSetPullUpDown(picButton, PI_PUD_UP); /// Enable pull-up resistor (button to ground)

	gpioSetMode(redLED, PI_OUTPUT); 
	gpioWrite(redLED, 0);
	gpioSetMode(recButton, PI_PUD_UP);
	gpioSetPullUpDown(recButton, PI_PUD_UP);

	gpioSetMode(powerButton, PI_INPUT); /// Set power button pin as input
	gpioSetPullUpDown(powerButton, PI_PUD_UP); /// Enable pull-up resistor (button to ground)

	bool redON = false;

	std::cout << "Press the button to control the LED" << std::ends;

	while(true){
	   /**
	    * @brief if the button for taking pictures pressed
	    * 
	    */
		if(gpioRead(picButton) == 0){ /// Button is pressed (assuming active low)
			
			gpioWrite(greenLED, 1);  /// Turn the LED on.

			/// Take a picture
            system("fswebcam -r 1280x720 --no-banner /home/pi/Desktop/3307/group14/image.jpg");

            /// Make an HTTP POST request to upload the image
            CURL *curl = curl_easy_init();
            if (curl) {
                /// Set the URL of the Node.js server endpoint for uploading the image
                curl_easy_setopt(curl, CURLOPT_URL, "http://localhost:4000/upload-image");

                /// Set the image file to upload
                curl_mime *form = curl_mime_init(curl);
                curl_mimepart *field = curl_mime_addpart(form);
                curl_mime_name(field, "image");
                curl_mime_filedata(field, "/home/pi/Desktop/3307/group14/image.jpg");

                /// Perform the HTTP POST request
                curl_easy_setopt(curl, CURLOPT_MIMEPOST, form);
                CURLcode res = curl_easy_perform(curl);
                if (res != CURLE_OK) {
                    std::cerr << "Failed to send HTTP POST request: " << curl_easy_strerror(res) << std::endl;
                }

                /// Clean up
                curl_mime_free(form);
                curl_easy_cleanup(curl);
            }

            /// Make an HTTP GET request to fetch the processed image
            CURL *curlGet = curl_easy_init();
            if (curlGet) {
                /// Set the URL of the Node.js server endpoint for fetching the image
                curl_easy_setopt(curlGet, CURLOPT_URL, "http://localhost:4000/picture");

                /// Perform the HTTP GET request
                CURLcode resGet = curl_easy_perform(curlGet);
                if (resGet != CURLE_OK) {
                    std::cerr << "Failed to send HTTP GET request: " << curl_easy_strerror(resGet) << std::endl;
                }

                /// Clean up
                curl_easy_cleanup(curlGet);
            }

            /// Wait for button release
            while (gpioRead(picButton) == 0) { /// Wait for button release
                usleep(1000); /// Sleep for 1ms to reduce CPU usage
            }

			gpioWrite(greenLED, 0); /// Turn the led off
		}

	    /**
	     * @brief if the button for start/stop record is pressed
	     * 
	     */
	    if(gpioRead(recButton) == 0){/// Buton is pressed
			usleep(10000); /// Debounce delay
		 	if(gpioRead(recButton) == 0){ /// Check again if the button is still pressed
				if(redON){
				gpioWrite(redLED, 0);/// Turn the LED off
						redON = false;
				}
				else{
				gpioWrite(redLED, 1);/// Turn the LED on
				redON = true;
				}
				///Wait for the record button to be released
				while(gpioRead(recButton) == 0){
				usleep(1000);
				}

				/// Make an HTTP GET request to fetch the video stream
				CURL *curl = curl_easy_init();
				if (curl) {
					/// Set the URL of the Node.js server endpoint for fetching the video stream
					curl_easy_setopt(curl, CURLOPT_URL, "http://localhost:4000/video");

					/// Perform the HTTP GET request
					CURLcode res = curl_easy_perform(curl);
					if (res != CURLE_OK) {
						std::cerr << "Failed to send HTTP GET request for video: " << curl_easy_strerror(res) << std::endl;
					}

					/// Clean up
					curl_easy_cleanup(curl);
				}

			}
	    }

	    /// Shutdown button
	    if(gpioRead(powerButton) == 0) {
	        std::cout << "Shutting down..." << std::ends;
	        system("sudo shutdown -h now");
	        break; 
	    }

	    usleep(10000); /// Sleep for 10ms to reduce CPU usage
	}
	
	gpioTerminate(); /// Should never reach here, but for good practice.
	return 0;
}


