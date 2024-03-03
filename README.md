# Manga Collection
This is a Vue project that was intent to record which manga and how many episodes I had purchased. Further functions are random manga recommendation, blog, and manga search.

## Built With

<img src="https://img.shields.io/badge/Vue%20js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D" /> <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" /> <img src="https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black" />


## Demonstration
### Homepage
![Homepage](https://live.staticflickr.com/65535/53482295101_a3851b797f_k.jpg)
Picture above demonstates the home page, which randomly recommend a manga with its picture and brief introduction. 

### Collection page
![Collection](https://live.staticflickr.com/65535/53565643115_b43ee39ab9_b.jpg)
![Collection](https://live.staticflickr.com/65535/53565388648_6260ea4c94_b.jpg)
At the collection page, in the upper pictures, the search bar allows me to search recorded mangas below with their names. Under the search bar, four buttons are used to filter what collection status I would like to watch. After that are recorded mangas. In each block, except information, clicking on the edit icon allows me to directly edit the contents if the update button is clicked. The delete icon allows me to delete the manga right away. Moreover, considering the use of adding manga at the bottom of this page, the lower pictures, two double arrows at the right of the page allows me to scroll to the top or bottom of the page. At the bottom of the page, there is a form that I can record a new manga if required.

### Blog page
![Collection](https://live.staticflickr.com/65535/53565517179_572d423c85_b.jpg)
At the blog page, all functions are similar to collection page, including the edit and delete icon in each block, as well as the add post function at the end of the page. A unique function here is that tags will be used as filters. By clicking at each tag, the page will show all blog posts with the same tag (this function is still developing).

### Search page
![Collection](https://live.staticflickr.com/65535/53565388643_a0c7776c6c_b.jpg)
At the search page, the page shows search result based on the keyword in the input. By clicking at the picture of the search result, it leads to the corresponding manga with thorough infomation at MyAnimeList.




## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
