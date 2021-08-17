var isClicked = false;

document.getElementById('expand').addEventListener('click',function(){
    if(isClicked==false)
    {
      document.getElementsByClassName('expanded')[0].textContent="-";
        isClicked=true;
    }
      else if(isClicked==true)
        {
          document.getElementsByClassName('expanded')[0].textContent="+";
            isClicked = false;
        }
    });