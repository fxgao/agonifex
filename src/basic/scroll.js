function backToTop(slow=true){
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if(slow){
        if (c > 0) {
            window.requestAnimationFrame(backToTop);
            window.scrollTo(0, c - c / 8);
        }
    }else {
        document.documentElement.scrollTop = 0;
    }
}

export default{
    backToTop
}