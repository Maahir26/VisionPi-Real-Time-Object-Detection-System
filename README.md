

This project aims to create an interactive and user-friendly Raspberry Pi system equipped with a physical button, LED lights, and a camera. The core functionality of the system is straightforward: upon pressing the  button, an LED will light up indicating that a picture has been taken, and the camera will capture a snapshot of its current view. The innovative aspect lies in the post-capture processing,  where the system utilizes OpenCV, a prominent open-source computer vision library, to analyze the captured image and identify the objects in the image.

## Prerequisite

For hardware, you will require the following:
- x4 Male to Female wires
- x1 Male to Male wire
- x1 Button
- x2 Resistors 220 ohm resistors
- x1 Green LED

For software, you will require the following:

## 1) OpenCV library 
    
    used for object detection and image processing

## 2) PIGPIO library 

    used for programming the Raspberry pi GPIO pins using C++ 

## 3) Node.js and npm library 
    used for the back end of the web interface

## Getting Started

### Installing OpenCV library:


#### Windows:
1. Download OpenCV: Go to the official OpenCV website (https://opencv.org/releases/) and download the pre-built libraries for Windows.

2. Extract Files: Unzip the downloaded files to a directory on your system, for example, C:\opencv.

3. Set Environment Variables: Add C:\opencv\build\x64\vc15\bin to your system’s Path environment variable. Adjust the path based on your system architecture and Visual Studio version.

4. Configure Visual Studio: In your Visual Studio project, configure the include directories, library directories, and linker input files to point to the corresponding locations within the C:\opencv directory.

#### macOS:
1. Install Homebrew: If not already installed, install Homebrew by following the instructions on the following website:

https://brew.sh/

2. Install OpenCV: Run the following command in the terminal: 
`brew install opencv`

3. Set up your C++ project: Link your C++ project with OpenCV libraries typically found in /usr/local/Cellar/opencv/. The version number can vary, so adjust accordingly.

#### Linux:
1. Install Dependencies: Open a terminal and install the required dependencies by running:

`sudo apt-get update`
`sudo apt-get install build-essential libgtk2.0-dev libavcodec-dev libavformat-dev libjpeg.dev libtiff4.dev libswscale-dev libjasper-dev`

2. Install OpenCV: You can install OpenCV from the repository by running,alternatively, you can download the latest source code from the OpenCV GitHub repository and build it yourself. :

`sudo apt-get install libopencv-dev`

3. Compile your C++ project: Ensure that your Makefile or CMakeLists.txt includes the appropriate paths to the OpenCV headers and libraries.


### Installing PIGPIO Library:


#### Raspberry Pi (Raspbian/Debian-based Linux):
1. Update and Upgrade: Open a terminal and update your Raspberry Pi's package lists and upgrade the existing software to the latest versions:

`sudo apt-get update`
`sudo apt-get upgrade`

2. Install pigpio: You can install the pigpio library directly from the repository:

`sudo apt-get install pigpio`

3. Enable the pigpio Daemon: The pigpio library requires the pigpio daemon to be running for certain functionalities. Start the daemon with the following commands:

`sudo systemctl enable pigpiod  # Enable the daemon to start at boot`
`sudo systemctl start pigpiod   # Start the daemon immediately `


### Installing Node.js and npm Library:


#### Linux (Fedora, Red Hat, CentOS):
1. Add Node.js to repository: You can use a similar approach as Ubuntu/Debian but with a different script for NodeSource. Replace "16.x" with the version you want:
curl -sL https://rpm.nodesource.com/setup_16.x | sudo bash -

2. Then install Node.js and npm using:

`sudo yum install nodejs`

OR

`sudo apt-get install nodejs npm `

3. Confirm the installation with node -v and npm -v.

#### Windows:
1. Go to the official Node.js website and download the Windows installer.
2. Run the downloaded .msi file and follow the instructions to install Node.js. Make sure to select the option to add Node.js to your PATH.
3. Open Command Prompt and enter node -v and npm -v to check the installed versions of Node.js and npm, respectively.

#### macOS 

1. Install Node.js and npm using:

` brew install node `

OR 

1. Visit the official Node.js website and download the macOS installer.
2. Open the downloaded .pkg file and follow the instructions to install Node.js.
3. Open Terminal and type node -v and npm -v to verify the installation of Node.js and npm.


### INSTRUCTIONS FOR SETTING UP WEBSITE 
 

1) Split 2 terminals.

     On 1st terminal, type 
       `cd ./backend`
     
     Now we must compile detect_img.cpp and detect_live.cpp.
     Compilation code depends on what machine you're on:

    #### MacOS:   
    
    `g++ detect_img.cpp -o detect_img.out -I/usr/local/include/opencv4 $(pkg-config --libs opencv4) -std=c++11`
    `g++ detect_live.cpp -o detect_live.out -I/usr/local/include/opencv4 $(pkg-config --libs opencv4) -std=c++11`
                 

    #### Linux/RaspberryPi: 
        
    `g++ detect_img.cpp -o detect_img.out pkg-config --cflags --libs opencv4` 
    `g++ detect_live.cpp -o detect_live.out pkg-config --cflags --libs opencv4s`
        
    on 2nd terminal, type 
    `cd./frontend`

2) Type the following command on both terminals

    `npm install `

3) Type the following command  on the 1st terminal
   ` npx nodemon server.js`

4) Type the following command  on the 2nd terminal
    `npm run start`

*** INSTRUCTIONS FOR SETTING UP RASPBERRY PI ***
1) Compile the button_led.cpp file using this command: 

    `g++ -o button_led button_led.cpp -lpigpio -lrt -pthread -lcurl`

2) Run the resulting executable using: 
    `sudo ./button_led`
