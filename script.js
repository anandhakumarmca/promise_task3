const container = document.createElement("div");
container.setAttribute("class", "container");

const heading = document.createElement("h1");
heading.setAttribute("id","title");
heading.setAttribute("class","text-center");
heading.innerHTML = "Displaying Store Data using FakeStoreAPI";
document.body.appendChild(heading);

const row = document.createElement("div");
row.setAttribute("class", "row");

document.body.append(container);
container.appendChild(heading);
container.appendChild(row);

const displayStoreData = async ()=>{
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    console.log(data);
    return data; 
}
displayStoreData().then(data=>{
    for(var i=0;i<data.length;i++){
        row.innerHTML+=`
       <div class="col-sm-6 col-md-4 col-lg-4 col-xl-4">
           <div class="card h-100" >
               <div class="card-header text-center bg-dark text-white">${data[i].category}</div>
               <img class="card-img-top" src="${data[i].image}" alt="Card image cap">
               <div class="card-body text-center" id="card-body">
                   <p class="card-text product-title"> ${data[i].title}</p>
                   <p class="card-text">Rs. ${data[i].price}</p>
                   <a href="#" class="btn btn-primary"> ADD to CART</a>
                </div>
           </div>
        </div>
       `;
       document.body.append(container);
   }
   return data;
}).then(data=>{ 
    let cartButton=document.querySelectorAll("a");
    for(let i=0;i<cartButton.length;i++){
       cartButton[i].addEventListener('click',function (e){ //adding event listener for the country selected
        e.preventDefault();

            //displaying the weather data as a alert message
            alert(`${data[i].title} Added to Cart `);
        });
       }});



