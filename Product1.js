const bImg = document.querySelector(".product-content-big img");
const sImg = document.querySelectorAll(".product-content-small img");
sImg.forEach(function(imgItem, X){
    imgItem.addEventListener("click", function(){
        bImg.src = imgItem.src;
    })
})
//----------
document.addEventListener("DOMContentLoaded", function() {
    const mota = document.querySelector(".mota");
    const dacdiem = document.querySelector(".dacdiem");
    const bang_size = document.querySelector(".bang_size");
    
    if(mota){
        mota.addEventListener("click", function(){
            document.querySelector(".information-product-content-mota").style.display = "block";
            document.querySelector(".information-product-content-dacdiem").style.display = "none";
            document.querySelector(".information-product-content-size").style.display = "none";
        })
    }
    
    if(dacdiem){
        dacdiem.addEventListener("click", function(){
            document.querySelector(".information-product-content-mota").style.display = "none";
            document.querySelector(".information-product-content-dacdiem").style.display = "block";
            document.querySelector(".information-product-content-size").style.display = "none";
        })
    }
    
    if(bang_size){
        bang_size.addEventListener("click", function(){
            document.querySelector(".information-product-content-mota").style.display = "none";
            document.querySelector(".information-product-content-dacdiem").style.display = "none";
            document.querySelector(".information-product-content-size").style.display = "block";
        })
    }
});
