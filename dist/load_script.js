function charge_css_js(tab,index,call)
{
  if(typeof(index) == 'function')
  {
    call = index;index = 0;
  }
  else if(typeof(index) == typeof(undefined)) index = 0;

  if(typeof(tab) === 'string') tab = new Array(tab);
  if(typeof(tab[index]) === 'object')
  {
    charge_css_js(tab[index][0],0,tab[index][1])
    index++;
  }
  if(typeof(tab[index]) != typeof(undefined) )
  {
    var patt = new RegExp(/\.js/);
    var pattcss = new RegExp(/\.css/);
    var yt = new RegExp(/player_api/);
    if(index < tab.length)
    {

      if(patt.test(tab[index])|| yt.test(tab[index]))
      {
        var element = document.createElement("script");
        element.src = tab[index];
        element.type = "text/javascript";
        document.body.appendChild(element);

        element.onload = function()
        { 
          var ind = index +1;
          charge_css_js(tab,ind,call);
        }
      }
      else if (patt.test(tab['index']))
      {
        var lien   = document.createElement('link');
        lien.href   = tab[index];
        lien.rel = "stylesheet";
        lien.media = "all";;
        document.head.appendChild(lien);
        lien.onload = function()
        {
          var ind = index+1;
          charge_css_js(tab,ind,call);
        }
      }  
      else
      {
        var ind = index+1;
        charge_css_js(tab,ind,call);
      }
    }
  }
  else
  {
    if(typeof(call) === "function")
    {
      call();
    }
  }
}