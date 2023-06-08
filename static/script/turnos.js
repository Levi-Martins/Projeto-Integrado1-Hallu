const chk = document.getElementById('check')
const i = document.getElementsByTagName('i')
chk.addEventListener('click',()=>{
    document.body.classList.toggle('dark')

    const check = document.getElementById('check')
    if(check.checked){
        console.log('aaaa')
        i[0].classList.replace('fa-sun', 'fa-moon');
    }else{
        console.log('bbbb')
        i[0].classList.replace('fa-moon', 'fa-sun');
    }
} )