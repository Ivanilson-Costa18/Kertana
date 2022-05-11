![Kertana Logo](https://github.com/Ivanilson-Costa18/Kertana/blob/master/Entregas/Entrega%20Final%20Kertana/poster-kertana.png) **[N'zembo - 50039011 &](https://github.com/Ivanilson-Costa18) [Bernardo - 50039481](https://github.com/Silvarini)**
<br> ![Website](https://img.shields.io/website?down_color=red&down_message=offline&up_color=green&up_message=online&url=https%3A%2F%2Fkertana.herokuapp.com%2F)            https://kertana.herokuapp.com/

# Table of Contents


1. [Enquadramento](#enquadramento)
2. [Highlights](#highlights)
3. [Deliveries](#deliveries)
4. [GUI](#gui)




## Framework
The Kertana platform will allow a user to search for an area on the map of Portugal where he can plant certain products, thus obtaining an area for his next plot of land or search within his terrain which products can planted in it.<br><br >
- **User:** Will have a profile on the platform with his slots and for each of them a feedback of how much time is left until the next harvest of the slot.<br><br>
- **Terrain:** Each terrain has a page where the user can view the time left for each production to be ready to harvest, a visualization of its terrain (image obtained by a satellite) and productions, these represented by a polygon with a defined color and information about the soil, surface temperature, temperature at 10 cm depth, humidity, climate, wind speed, atmospheric pressure, humidity and clouds of his terrain.<br><br>
- **Productions:** A production represents a product that has been planted in the slot. Each production has a product, an initial date of planting, indicated by the user, a stage of growth from germination, maturation and ready to harvest and a stage of harvest.<br><br>
- **Product:** Each product has ranges of tolerable temperature values and sowing times, meaning sowing times for months in which that product can be planted.<br><br>
Kertana needs systems, such as the Agro API and Mapbox, for the platform's features to be executed.<br><br>
- **Agro API:** Kertana uses the data provided by the Agro API to filter results in the user's queries, listing the products recommended by the platform for the user to plant in their land and alert if the values provided by the Agro API are not within the tolerable range of a product.<br><br>
- **Mapbox:** Mapbox is a service that provides the map used on the platform accompanied by a library of functions, specified in the documentation, which allow us to work with the information to be displayed on the map.
The Kertana platform does not work well as a standalone one, that is, if there is no internet access, our service is useless.



## Highlights
**Consult Locations** - User consults by areas where he can grow a certain vegetable.<br>
**Consult Vegetables** - User consults for vegetables with conditions to be cultivated in their land.<br>
**Get Feedback and Notifications from Crops** - Get feedback on how long the vegetable will take to harvest and a notification when harvest time arrives.<br>
**Manage Land** - A user may have more than one land to manage on the platform.<br>

## Deliveries

### First Delivery
  1.11.2020
- [x] Project name
- [x] Concept and reasearch on the area in which it operates and on other tools that already exist
- [x] Creation of proto-persona (use description)
- [x] 1 core use case (describes step by step, user's progression)
- [x] 2 other use cases

### Second Delivery
  15.11.2020
- [x] Final use case definition and personas
- [x] Use case diagram
- [x] Functional and not functional requirements necessary for presented scenes
- [x] Ux journeys
- [X] Mockups
- [x] Domain model
- [x] Requirement implementations calendar
- [x] Software project plan

### Third Delivery
  13.12.2020
- [x] Software Project Plan and WBS
- [x] Working prototype
- [x] Prototype's code
- [x] Functional and non functional requirements
- [x] Block Diagram - 3 layers 
- [x] Usability and UX tests
- [x] Mockups and early web interfaces
- [x] Domain Model and State Machine Diagram 

### Forth Delivery
  04.02.2021
- [x] Project final version
- [x] Final version code
- [x] Updated concept and use cases
- [x] Interaction description with BPMN 
- [x] REST service documentation
- [x] Power Point Presentation
- [x] Demo Video 


## GUI
### Home Page Hero
![Home-Page-Hero](https://github.com/Ivanilson-Costa18/Kertana/blob/master/GUI/Home%20Hero.png)
### Home Page Body 1
![Home-Page-Body-1](https://github.com/Ivanilson-Costa18/Kertana/blob/master/GUI/Home%20Body%201.png)
### Home Page Body 2
![Home-Page-Body-2](https://github.com/Ivanilson-Costa18/Kertana/blob/master/GUI/Home%20Body%202.png)
### Home Page Hero> Search Field with Products
![Search-Product-Page](https://github.com/Ivanilson-Costa18/Kertana/blob/master/GUI/Product%20Search.png)
### Home Page Hero> Search Field with Products> Search Field with Products (Location Selected)
![Search-Product-Page-Selected](https://github.com/Ivanilson-Costa18/Kertana/blob/master/GUI/Product%20Search%20Selected%20Location.png)
### Home Page Hero> Search Products with Locations
![Field-Search-Page](https://github.com/Ivanilson-Costa18/Kertana/blob/master/GUI/search-page-location.png)
### Home Page Hero> Profile Page
![Profile-Page](https://github.com/Ivanilson-Costa18/Kertana/blob/master/GUI/Profile.png)
### Home Page Hero> Profile Page> Field Creation Page
![Field-Creation-Page](https://github.com/Ivanilson-Costa18/Kertana/blob/master/GUI/Field%20Creation.png?raw=true)
### Home Page Hero> Profile Page> Field Creation Page> Field Creation Form
![Field-Creation-PopUp](https://github.com/Ivanilson-Costa18/Kertana/blob/master/GUI/Creat%20Field.png?raw=true)
### Home Page Hero> Profile Page> Field Page
![Field-Page](https://github.com/Ivanilson-Costa18/Kertana/blob/master/GUI/Field.png)
### Home Page Hero> Profile Page> Field Page> Add Product to Field
![Add-Product-PopUp](https://github.com/Ivanilson-Costa18/Kertana/blob/master/GUI/field-page-add-product.png)
