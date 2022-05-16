let a=[{id1:1,id2:2,id3:3}]
a.forEach((ele)=>{
    ele.id1=20
})
a[0].id1=50
console.log(a);