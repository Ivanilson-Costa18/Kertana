![Kertana Logo](https://github.com/Ivanilson-Costa18/Kertana/blob/master/Entregas/Entrega%20Final%20Kertana/poster-kertana.png) **[N'zembo - 50039011 &](https://github.com/Ivanilson-Costa18) [Bernardo - 50039481](https://github.com/Silvarini)**
<br> ![Website](https://img.shields.io/website?down_color=red&down_message=offline&up_color=green&up_message=online&url=https%3A%2F%2Fkertana.herokuapp.com%2F)            https://kertana.herokuapp.com/

# Table of Contents


1. [Enquadramento](#enquadramento)
2. [Highlights](#highlights)
3. [Deliveries](#deliveries)
4. [GUI](#gui)
5. [Diagrams](#diagrams)



## Enquadramento
A plataforma Kertana vai permitir a um utilizador procurar por uma zona do mapa de Portugal onde possa plantar produtos que o mesmo especificou, assim obtendo uma zona para o seu próximo terreno ou procurar dentro do seu terreno que produtos pode plantar.<br><br>
- **Utilizador:** Ele terá um perfil na plataforma com os seus terrenos e para cada um deles um feedback de quanto falta para a próxima colheita do terreno.<br><br>
- **Terreno:** Cada terreno tem uma página onde o utilizador pode visualizar o tempo que falta para cada produção estar pronta para colher, uma visualização do seu terreno (imagem obtida por um satélite) e produções, estes representados por um polígono com uma cor definida e informações sobre o solo, temperatura da superfície, temperatura a 10 cm profundidade e humidade, e clima, velocidade do vento, pressão atmosférica, humidade e nuvens, do seu terreno.<br><br>
- **Produções:** As produções são produtos que se encontram plantados no terreno. Cada produção tem um produto, uma data inicial da plantação, indicada pelo utilizador, um estado de crescimento desde germinação, maturação e pronto a colher e um estado da colheita.<br><br>
- **Produto:** Cada produto tem intervalos de valores toleráveis de temperatura e épocas de semear, entenda-se épocas de semear por meses em que se pode plantar aquele produto.<br><br>
A Kertana necessita de sistemas, como a Agro API e Mapbox, para as funcionalidades da plataforma serem executadas.<br><br>
- **Agro API:** A Kertana utiliza os dados fornecidos pela Agro API para filtrar resultados nas consultas do utilizador, listagem de produtos recomendados pela plataforma para o utilizador plantar no seu terreno e alertar caso os valores fornecidos pela Agro API não estejam dentro do intervalo tolerável dos produtos.<br><br>
- **Mapbox:** O Mapbox é um serviço que disponibiliza o mapa utilizado na plataforma acompanhado de uma de uma biblioteca de funções, especificadas na documentação, que nos permitem trabalhar a informação a ser apresentada no mapa.
A plataforma Kertana não funciona bem como uma standalone, ou seja, se não houver acesso à internet, o nosso serviço não tem utilidade.



## Highlights
**Consultar Local** - Utilizador consulta por zonas onde pode cultivar uma certa hortaliça.<br>
**Consultar Hortaliça** - Utilizador consulta por hortaliças com condições para serem cultivar no seu terreno.<br>
**Receber Feedback e Notificações das Plantações** - Obter feedback de quanto tempo demorará a hortaliça para ser colhida e uma notificação de quando o tempo de colher chegar.<br>
**Gerir Terrenos** - Um utilizador poderá ter mais do que um terreno para gerir na plataforma.<br>

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


## Diagrams

#### Context Diagram
![](https://github.com/Ivanilson-Costa18/Kertana/blob/master/Diagrams/Context%20Diagram.png)

#### Use Case Diagram
![](https://github.com/Ivanilson-Costa18/Kertana/blob/master/Diagrams/Use%20Case%20Diagram.png)

#### Domain Model
![](https://github.com/Ivanilson-Costa18/Kertana/blob/master/Diagrams/Domain%20Model.png)

#### Machine State Diagram
![](https://github.com/Ivanilson-Costa18/Kertana/blob/master/Diagrams/State%20Machine%20Polygon%20State.png)
![](https://github.com/Ivanilson-Costa18/Kertana/blob/master/Diagrams/State%20Machine%20Harvest%20State.png)

#### CRUD Matrix
![](https://github.com/Ivanilson-Costa18/Kertana/blob/master/Diagrams/CRUD%20Matrix.png)

#### Block Diagram
![](https://github.com/Ivanilson-Costa18/Kertana/blob/master/Diagrams/Block%20Diagram.png)

#### BPMN - Field Creation
![](https://github.com/Ivanilson-Costa18/Kertana/blob/master/Diagrams/BPMN%20Field%20Creation.png)



