// <!-- food2fork api key: a3315202ca731c538d509f7f30066e17  -->
// <!-- edamam app id: 8c48a9fe; app keys: 256ca5ca5b56286517eb234b18eac4d6 and  -->
// Cortical api key: 2ca8f980-8f05-11e8-917d-b5028d671452
// Walmart api key: cxrvuuvddcp5vh8974fkqcfy ---- food category id: 976759

//common script

  function openLogin() {
    document.getElementById('loginForm').style.height='30vw'
    document.getElementById('loginForm').style.display='block'
    // document.getElementById('loginStatus').style.display='none'
  }

  function closeLogin() {
    document.getElementById('loginForm').style.height='0vw'
    document.getElementById('loginForm').style.display='none'
    // document.getElementById('loginStatus').style.display='block'
  }

  function openSignUp() {
    document.getElementById('signUpForm').style.height='30vw'
    document.getElementById('signUpForm').style.display='block'
    // document.getElementById('signUpStatus').style.display='none'
  }

  function closeSignUp() {
    document.getElementById('signUpForm').style.height='0vw'
    document.getElementById('signUpForm').style.display='none'
    // document.getElementById('signUpStatus').style.display='block'
  }
  // function submitLogin() {
  //   if
  // }
  // function submitSignUp() {
  //   var userName = document.getElementById(newUserName);
  //   var uname = userName.value;
  //   var pass = document.getElementById(newPassword);
  //   console.log(uname.value);
  //   // console.log(pass.value);
  // }
  window.onscroll = function() {scrollFunction()};

  function scrollFunction() {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
          document.getElementById("myBtn").style.display = "block";
      } else {
          document.getElementById("myBtn").style.display = "none";
      }
  }

  // When the user clicks on the button, scroll to the top of the document
  function topFunction() {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }


////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////

//Script for ambrosiaPantry.html
  function openNav() {
      document.getElementById("tab").style.width = "20vw";
      document.getElementById("main").style.marginLeft = "20vw";
  }

  function closeNav() {
      document.getElementById("tab").style.width = "0";
      document.getElementById("main").style.marginLeft= "0";
  }

  function openCategory(evt, categoryName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(categoryName).style.display = "block";
    evt.currentTarget.className += " active";
}

////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////

//Script for ambrosiaRecipes.html

  $(document).ready(function() {
    $('#submitBtn').click(function() {
      document.getElementById("recipesResult").innerHTML = "";

      var request = new XMLHttpRequest();
      // var url = 'http://food2fork.com/api/search?key=a3315202ca731c538d509f7f30066e17&q=shredded%20chicken'
      var base = 'https://api.edamam.com/search?app_id=8c48a9fe&app_key=256ca5ca5b56286517eb234b18eac4d6&q=';
      var input = document.getElementById("ingredientsInput").value;
      var url = base.concat(input);
      url = url.replace(" ", "+")
      url = url.replace(",", "%2C")
      console.log(url);

      request.open("GET", url, true);
      request.send();

      request.onreadystatechange = function() {
       if (this.readyState === 4 && this.status === 200) {
         var response = JSON.parse(this.responseText);
         console.log(response);

         var recipeList = response.hits;
         console.log(recipeList);

         for (i=0; i<recipeList.length; i++) {
           var recipeItem = response.hits[i].recipe;
           console.log(recipeItem);

           var recipeTitle = recipeItem.label;
           var node = document.createElement("DIV");
           node.setAttribute("id", recipeTitle)
           var textnode = document.createTextNode(recipeTitle);
           node.appendChild(textnode);
           document.getElementById("recipesResult").appendChild(node);

           var recipeImageLink = recipeItem.image;
           var recipeImageName = recipeTitle.concat("Image");
           var node = document.createElement("IMG");
           node.src = recipeImageLink;
           node.setAttribute("id", recipeImageName)
           document.getElementById("recipesResult").appendChild(node);

           var ingredientsForRecipe = recipeTitle.concat("Ingredients")

           var span = document.createElement("SPAN");
           span.setAttribute("id", ingredientsForRecipe);
           var txt = document.createTextNode("v");
           span.appendChild(txt);
           document.getElementById("recipesResult").appendChild(span);


           var node = document.createElement("UL");
           node.setAttribute("id", ingredientsForRecipe)
           var textnode = document.createTextNode("Ingredients:");
           node.appendChild(textnode);
           document.getElementById("recipesResult").appendChild(node);

           var ingredients = recipeItem.ingredientLines;
           console.log(ingredients);

           var recipeLink = recipeItem.url;
           console.log(recipeLink);
           var node = document.createElement("LI");
           node.setAttribute("id", "recipeLink");
           var textnode = document.createTextNode(recipeLink);
           node.appendChild(textnode);
           document.getElementById(ingredientsForRecipe).appendChild(node);

           for (j=0; j<ingredients.length; j++) {
             // document.getElementById("result").innerHTML = ingredients[i];
              var node = document.createElement("LI");
              node.setAttribute("id", ingredients[j]);                // Create a <li> node
              var textnode = document.createTextNode(ingredients[j]); // Create a text node
              // node.style.display = "none";                            // Makes LI invisible until span is clicked
              node.appendChild(textnode);                              // Append the text to <li>
              document.getElementById(ingredientsForRecipe).appendChild(node);
           }

         }

       }

      }
     //  $('SPAN').click(function(ingredientsForRecipe) {
     //   var node = document.getElementById(ingredientsForRecipe).style.display = block;
     // // });
    });
    // $('SPAN').click(function(ingredientsForRecipe) {
    //   var node = document.getElementById("")
    // });
  });

////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////

//Script for ambrosiaShoppingList.html
  var child;
  var names;
  var i = 0;
  var li;
  var check;


  function createShopList() {

   if (shopList[i].length>0) {
      check = false;
      var li = document.createElement("LI");
      li.style="list-style='none'";
      var node = document.createElement("INPUT");
      node.type = 'button';
      li.appendChild(node);
      var textnode = document.createTextNode(shopList[i]);
      li.appendChild(textnode);
    //  li.setAttribute("class", "checkButtons")
      // console.log(li);
      document.getElementById("myList").appendChild(li);
      i = i + 1;
      console.log("if");
      document.getElementsByClassName("checkButtons").onclick = makeItTrue(check);
    }else {
      shopList.splice(i, 1);
      console.log("else");
    }

  }

  var shopList = [];

  function addToShopList(){ //adds a new item from the user to the shopping list
    currfood = document.getElementById("foodName").value// finds the value that the user typed
    shopList.push(currfood); //adds the item to the list
    console.log(shopList); //prints to the console to test the function
  }

  function makeItTrue(bool){
    bool = true;
    console.log("its true")
  }

  function createShopListCheck() {
    if (shopList[i].length> 0  ) { //|| noItemsInList = true
      noItemsInList = false;
      li = document.createElement("LI");
      li.style="list-style='none'";
      var node = document.createElement("INPUT");
      node.type = 'checkbox';
      li.appendChild(node)
      var textnode = document.createTextNode(shopList[i]);
      li.appendChild(textnode);
      document.getElementById("myList").appendChild(li);
      i = i + 1;
    }else{
      shopList.splice(i, 1);
    }

  }
  var checkedList = [];
  var checkingList =[];
  function moveCheckedItems(){
    checkingList = document.forms[0];
    for(g = 0; g< checkingList.length; g++) {
      if (checkingList[g].checked) {
        checkedList.push(g);
        console.log(g);
      }
    }
    // checkedList=[];
    // for (g = 0; g < shopList.length; g++) {
    //   console.log("Hello");
    //   var checkBox = document.getElementById();
    //   console.log(checkBox);
    //   if (checkBox.checked == true){
    //     checkedList.push(g);
    //     console.log(g);
    //   }
    // }
    // console.log(checkedList);
    // removeChecked();
  }

  function removeChecked(){
    for (k = 0; k < checkedList.length; k++) {
      var remove = document.getElementById("myList[checkedList[k]]");
      remove.innerHTML = "";
    }
  }

  var noItemsInList;
  function removeAll(){
    var remove = document.getElementById("myList");
    remove.innerHTML = "";
    //  shopList =[];
    //  noItemsInList = true;

  }

////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////

//Script for ambrosiaProfile.html
  //this function is currently not working
  function restrictionAllergies() {
    var allergies = document.forms[0];
    var txt = "";
    var i;
    for (i = 0; i < allergies.length; i++) {
        if (allergies[i].checked) {
            txt = txt + allergies[i].value + " ";
              console.log(txt);
        }
    }
  }
