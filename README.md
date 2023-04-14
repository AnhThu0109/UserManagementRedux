# User Management Web Application

Owner: Nguyen Ngoc Anh Thu

Briefly introduction:
 - My site is built using HTML, CSS, Bootstrap 5, JavaScript, ReactJS, AntDesign and MongoDB.

 - This website consists of seven pages including welcome page, register page, login page, dashboard page, total users page, my account page, and not found page. When a user attempts to access my website without logging in, they will only be able to view the welcome page, register page, login page and not found page. 
 
 - Upon providing valid login credentials, they will be redirected to the dashboard page, which provides an overview of the systems infomation. The total users page displays the total number of registered users on the website, while the my account page allows users to edit their account information.

 - I have implemented two types of users: admin and normal. Admins have full access to the website's features and can view basic information of all users, add new users to the system and delete users, including themselves. In addition, admins can update their own information.
 Normal users have limited access to the website's features. They can only update their own information and view basic information for other users.

- This website is also flexible for many devices such as desktop, tablet and mobile.

## PAGES

There are seven pages including welcome page, register page, login page, dashboard page, total users page, my account page, and not found page.

### `Welcome Page`

![Image 1](https://i.ibb.co/JnG8n79/image-2023-03-30-194221804.png)<br>
On this page, you will find an introduction text and a "Get Started" button that will allow you to access my website and start exploring its features.

![Image 2](https://i.ibb.co/3r7QDgp/image-2023-03-30-193327948.png)<br>
When you click on the "Get Started" button, you will be taken to a processing page. This may take a few moments, so please be patient.

Once the processing is complete, you will be directed to login page where you can enter your login credentials to access the website's full features.

### `Register Page`
 
![Img Register](https://i.ibb.co/z7VBVyz/image-2023-03-31-151744298.png)<br>
If you do not have an account yet, this page allows you to create one on my website. Please fill out all required fields before submit it. 

### `Login Page`

![Image 3](https://i.ibb.co/kmCMXMD/image-2023-03-31-145205867.png)<br>
This page is designed to provide you with secure access to my website's features.

To access this website, you will need to enter your username and password in the fields provided. Once you have entered your login credentials, click the "Login" button to access the website's full features.

### `Dashboard Page`

![Image 4](https://i.ibb.co/kXpZtfX/image-2023-03-30-194525797.png)<br>
This page consists of some basic infomation:
* Total users in the system
* List of three users added/ updated today
* A chart of top 10 activity users in system (according to the login times)  
* Weather forecast information for the current day as well as the next two days. You can easily search for a location using the search bar provided.

### `Total Users Page`

#### As an admin user:

![Image 5](https://i.ibb.co/LdDqKT5/image-2023-04-03-012813184.png)<br>

#### As a normal user:

![Image 6](https://i.ibb.co/n6tmrRD/image-2023-03-30-203844878.png)<br>
This page is designed to provide you a list of all users in the system, including their username, gender, email address, and created time.

The users list is paginated, with each page consisting of 7 users. You can navigate through the pages using the pagination buttons at the bottom of the page.

#### As an admin user, you have the ability to:

![Image 7](https://i.ibb.co/xsqwCch/image-2023-04-03-013358040.png)<br>

* Add new users to the system by clicking add user icon at the top right of the page.

![Image 8](https://i.ibb.co/9gLrmZG/image-2023-04-03-000050024.png)<br>

* See others information by clicking on the corresponding buttons next to each user's information in the list.<br>

![Image 9](https://i.ibb.co/gjLtj6Y/image-2023-04-03-013700645.png)<br>

* Delete existing users.

![Image 10](https://i.ibb.co/Y7XKdZW/image-2023-04-03-013558102.png)<br>

**Note*: If an admin chooses to delete their own account, the system will automatically log them out and redirect them to the login page.**

#### As a normal user, you have the ability to:
* See others information by clicking on the corresponding buttons next to each user's information in the list.<br>

![Image 11](https://i.ibb.co/wL1zmCc/image-2023-03-30-203204098.png)<br>
![Image 12](https://i.ibb.co/ZxHBNPx/image-2023-03-30-203258283.png)<br>

Additionally, you can use the search bar provided to search for a specific user by their username or email address. and filter gender as Male or Female.

![Image 13](https://i.ibb.co/cwNCtGR/image-2023-03-30-200743467.png)<br>
![Image 14](https://i.ibb.co/bQBr8Yw/image-2023-03-30-200916350.png)<br>

### `My Account Page`

![Image 15](https://i.ibb.co/WvNLt2t/image-2023-04-03-143122426.png)<br>
This is where you can access and manage your account information. This page consists of:
* Basic Info: You can view your basic account information, including your name, email address, and other relevant details.
* Update Info: You can update your account information, such as your name, email address, and other details as needed.
* Change Avatar: You can also change your avatar by choosing illustrated images or uploading a new image from your computer.

![Image 16](https://i.ibb.co/z4P4Ymk/image-2023-04-03-143256733.png)<br>
![Image 17](https://i.ibb.co/23hr7Zd/image-2023-04-03-143419158.png)<br>

### `Not Found Page`

When you entered does not exist or the page you are trying to access has been removed or relocated, "Not Found" page is shown with a message informing you that the page you requested could not be found and a button to return the previous page.

![Image 18](https://i.ibb.co/qBtgZWX/image-2023-04-02-005431787.png)<br>

**Note*: Menu can be collapsed or uncollapsed by clicking menu icon at top left of page**
![Image 19](https://i.ibb.co/tPXL604/image-2023-03-30-204820438.png)<br>

**Note*: To logout, click to user icon at the top right of page and click logout**
![Image 20](https://i.ibb.co/R2Mqnh0/image-2023-03-30-204630165.png)<br>

# Responsive Web Design

## MOBILE VIEW

### `Uncollapsed menu`

![Image 21](https://i.ibb.co/WVwxYvn/image-2023-03-31-093544424.png)<br>

### `Register Page`

![Register mobile](https://i.ibb.co/Fhgk9Cm/image-2023-03-31-150435939.png)<br>

### `Login Page`

![Image 22](https://i.ibb.co/2jqP471/image-2023-03-31-150038813.png)<br>

### `Dashboard Page`

![Image 23](https://i.ibb.co/bzv3z4z/image-2023-03-31-093253444.png)
![Image 24](https://i.ibb.co/x578tFk/image-2023-03-31-093401587.png)<br>

### `Total Users Page`

![Image 25](https://i.ibb.co/kqfnx8Y/image-2023-04-03-013019945.png)<br>

 #### See information of other users (for Normal user and Admin)

![Image 26](https://i.ibb.co/wYrXn9B/image-2023-03-31-094851418.png)<br>

 #### Add new user (for Admin)

![Image 27](https://i.ibb.co/BrfD2xN/image-2023-04-03-000811449.png)<br>

 #### Delete user (for Admin)

![Image 28](https://i.ibb.co/102w4b5/image-2023-03-31-095201020.png)<br>

### `My Account Page`

![Image 29](https://i.ibb.co/y6pcqn6/image-2023-03-31-100017050.png)
![Image 30](https://i.ibb.co/y04XGqN/image-2023-04-03-143557940.png)<br>

 #### Change avatar 

![Image 31](https://i.ibb.co/R2xwbVv/Capture.png)
![Image 32](https://i.ibb.co/X4krFvJ/image-2023-03-31-100339177.png)<br>

## TABLET VIEW

### `Uncollapsed menu`

![Image 33](https://i.ibb.co/2PJznTH/image-2023-03-31-100614635.png)<br>

### `Register Page`

![Register Tablet](https://i.ibb.co/Hq5t3x6/image-2023-03-31-150355664.png)<br>

### `Login Page`

![Image 34](https://i.ibb.co/dprRncP/image-2023-03-31-150154408.png)<br>

### `Dashboard Page`

![Image 35](https://i.ibb.co/k0CbQKb/image-2023-03-31-101142047.png)
![Image 36](https://i.ibb.co/my6WKpx/image-2023-03-31-101246760.png)<br>

### `Total Users Page`

![Image 37](https://i.ibb.co/nQK63Pj/image-2023-04-03-013138581.png)<br>

 #### See information of other users (for Normal user and Admin)

![Image 38](https://i.ibb.co/Km5KcDm/image-2023-03-31-101606339.png)<br>

 #### Add new user (for Admin)

![Image 39](https://i.ibb.co/DtXKSXw/image-2023-04-03-000615752.png)<br>

 #### Delete user (for Admin)

![Image 40](https://i.ibb.co/pbdCd8R/image-2023-03-31-101804458.png)<br>

### `My Account Page`

![Image 41](https://i.ibb.co/D9PJWN6/image-2023-03-31-101917313.png)
![Image 42](https://i.ibb.co/wyyLzGp/image-2023-04-03-143742986.png)<br>

 #### Change avatar 

![Image 43](https://i.ibb.co/fd8ZYqj/image-2023-04-03-144206644.png)
![Image 44](https://i.ibb.co/LhfFRnb/image-2023-04-03-144251587.png)<br>

## DESTOP VIEW

### `Uncollapsed menu`

![Image 19](https://i.ibb.co/tPXL604/image-2023-03-30-204820438.png)<br>

### `Register Page`

![Img Register](https://i.ibb.co/z7VBVyz/image-2023-03-31-151744298.png)<br>

### `Login Page`

![Image 3](https://i.ibb.co/kmCMXMD/image-2023-03-31-145205867.png)<br>

### `Dashboard Page`

![Image 4](https://i.ibb.co/kXpZtfX/image-2023-03-30-194525797.png)<br>

### `Total Users Page`

![Image 5](https://i.ibb.co/LdDqKT5/image-2023-04-03-012813184.png)<br>

 #### See information of other users (for Normal user and Admin)

![Image 9](https://i.ibb.co/sQycJk7/image-2023-03-30-200130510.png)<br>

 #### Add new user (for Admin)

![Image 8](https://i.ibb.co/9gLrmZG/image-2023-04-03-000050024.png)<br>

 #### Delete user (for Admin)

![Image 10](https://i.ibb.co/Y7XKdZW/image-2023-04-03-013558102.png)<br>

### `My Account Page`

![Image 15](https://i.ibb.co/WvNLt2t/image-2023-04-03-143122426.png)<br>

 #### Change avatar 

![Image 16](https://i.ibb.co/z4P4Ymk/image-2023-04-03-143256733.png)<br>
![Image 17](https://i.ibb.co/23hr7Zd/image-2023-04-03-143419158.png)<br>
