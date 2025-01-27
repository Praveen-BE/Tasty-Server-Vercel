# Tasty-API Server

## Disclaimer:- I use [Swiggy](https://www.swiggy.com/) api data for Education purpose only.

## Credits:- [https://www.swiggy.com/](https://www.swiggy.com/)

Why I and You Need this Tasty-API Sever?

Swiggy rapidly changes their API for their security purposes. Also it has [cors](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) issues.

<details>
<summary>
👇 Read more ?
</summary>

First they hide their data into file bangalore
<img style="vertical-align: sub" src="./images/datahideinFile1.png" alt="swiggyapidatascrappings" />

and next other api calls they hide their data in header you can see in preview [https://www.swiggy.com/api/seo/getListing?lat=12.960059122809971&lng=77.57337538383284&isDineoutCollection=false]()
<img style="vertical-align: sub" src="./images/screenshot.png" alt="swiggyapidatascrappings" />

This server didn't contain all swiggy data only has two api data. it's enough for [Akshy Saini](https://www.linkedin.com/in/akshaymarch7/?originalSubdomain=in)'s [Namaste React Course]().

- we can take aproximately 25 x 8 = 200 restaurant name in this api by pages.

- but only one restuarant menu i have, restaurant menu file is very big, use that thing for all of your restaurant !!!!!! Why Not.

i use [https://minify-js.com/](https://minify-js.com/) to minify the object file and put .prettireignore for that file

if github automatically expant that file minified yourself otherwise your machine will create noise

This Tasty-API Server (node js server) provide json for My [Namaste React Course](https://namastedev.com/learn/namaste-react) React app.

Here we go again like GTA San Andreas 😂.

</details>

## 🖨️ clone this Repository

Open new emty folder in your vs code run this command on terminal

```bash
  git clone "https://github.com/Praveen-BE/Tasty-Server.git"
```

navigate to project

```bash
  cd Tasty-Server
```

install dependencies

```bash
  npm install
```

for one time run (node index.js)

```bash
  npm run start
```

whenever you save and re-run (nodemon index.js)

```bash
  npm run dev
```

## localhost and cors

Go to the index.js

- You can change your backend port as you wish
- if your frontend url or port in diffent change in index.js for bypass cors

## 💽 NoSql database

- if you are familier with nosql database see folder "/jsonFiles" i put all json files here. use what can you do.

## restaurantList API

```bash
  http://localhost:3333/restuarantList/1
```

- the last number of this request is taken as page. Try your javascript knowledge, think how to add another requested data your redux state store or context api or useState.

this api call will give you restaurant list for app we can get upto 25 page in this api. approximatly 25 x 8 all are unique restaurant.

## restaurantMenu API

```bash
  http://localhost:3333/restuarantMenu/111111
```

- in this api i did not take the id of the restaurant also i only send "Chinese Wok" restaurant menu.

Because the json file is too large likely 13MB, i compressed and put in /minifiedFile it size like 6MB and put that route into .prettierignore to avoid automatic formatting.

## conclusion

Ok I tested it with my three month old swiggy app it works perfectly fine.

I saw In linkedin some people use backend cors to bypass Swiggy api like Chetan Nada's [foodfire-Server](https://github.com/chetannada/FoodFire-Server).

But it did't work in my system. Try that method it didn't work use this repository Complete the project to Understand the Concept.

### All the best 👍.
