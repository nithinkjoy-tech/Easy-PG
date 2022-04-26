let a=13;

for(let i=0;i<a;i++){
    if(a==4*i){
        console.log(i)
        break;
    }else if(a<(4*i)){
        console.log(i-1)
        break;
    }
}