window.addEventListener("load", () =>{
    const nombreProducto = document.getElementById("n1")
    const precioProducto = document.getElementById("p1")
    const descuentoProducto = document.getElementById("d1")
    const descripcionProducto = document.getElementById("d2")

    
 
 if (typeof nombreProducto === "string" & nombreProducto != "") {
     console.log("todo en orden")
 }
 else{
     console.log("algo anda mal")
 }
 
 if (typeof precioProducto === "string" & precioProducto != "") {
     console.log("todo en orden")
 }
 else{
     console.log("algo anda mal")
 }
 
 if (typeof descuentoProducto === "string" & descuentoProducto != "") {
     console.log("todo en orden")
 }
 else{
     console.log("algo anda mal")
 }
 
 if (typeof descripcionProducto === "string" & descripcionProducto != "") {
     console.log("todo en orden")
 }
 else{
     console.log("algo anda mal")
 }
 })