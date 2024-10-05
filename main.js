// window.localStorage.clear();
window.onload= function()
{
    get_data();
    document.getElementById("inp").placeholder="Add Your Task";
}
let tasklist=[];
let compeletetasks=[];
let counter=0;
function save_task()
{
    window.localStorage.setItem("tasks",JSON.stringify(tasklist));
    window.localStorage.setItem("compelete",JSON.stringify(compeletetasks));
    window.localStorage.setItem("count",JSON.stringify(counter));
}
function get_data()
{
    
    if(window.localStorage.length>0){
    let tasklist2 = JSON.parse(window.localStorage.getItem("tasks"));
    let compeletetask=JSON.parse(window.localStorage.getItem("compelete"));
    let count=JSON.parse(window.localStorage.getItem("count"));
       for(let i=0;i<count;i++)
       {
        if(typeof(tasklist2[i])=='string')
        {
            if(compeletetask[i]=="notcompelete!!")
            addtask(tasklist2[i],false,i);
            else
            addtask(tasklist2[i],true,i);

        }
       }
    }
    else
    {

    }

}
if(window.localStorage.length>0)
    {
        tasklist = JSON.parse(window.localStorage.getItem("tasks"));
        compeletetasks = JSON.parse(window.localStorage.getItem("compelete"));
        counter= JSON.parse(window.localStorage.getItem("count"));
    }
function cheack_input(){
    let input=document.getElementById("inp").value;
    if(input=="")
    {
        document.getElementById("inp").placeholder="Please Enter Your Task";
    }
    else
    {
        //save task content in array
      tasklist.push(input);
      //add task to page
      addtask(input,false,counter);
      compeletetasks.push("notcompelete!!");
      counter++;
      save_task();
      
    }
}
function addtask(input,c,count1){
    //make alert div , buttons and content
    let alret = document.createElement("div");
    alret.classList.add("alert");
    alret.classList.add("hide-alert");

    let alret_buttons = document.createElement("div");
    alret_buttons.classList.add("buttons");

    let cancel=document.createElement("button");
    cancel.innerHTML="Cancel";
    cancel.classList.add("cancel");

    let delet=document.createElement("button");
    delet.classList.add("delet_task");
    delet.innerHTML="Delte";
    
    //make warn icon
    let warn=document.createElement("button");
    warn.classList.add("warn");
    warn.innerHTML=`<i class="fa-solid fa-triangle-exclamation"></i>`
    //make warn message
    let warn_p=document.createElement("p");
    warn_p.innerHTML="You cannot restore it again. Make sure you delete it";
    //append buttons (cancel , delete )to alertbuttons
    alret_buttons.append(cancel);
    alret_buttons.append(delet);
    //append warning icon to alert div 
    alret.append(warn);
     //append message to alert
    alret.append(warn_p);
     //append alertbuttons to alert
    alret.append(alret_buttons);

    //////////////////////////////////////

    //make the maindiv(task)
    let mydiv=document.createElement("div");
    mydiv.classList.add("maindiv");
    //div content task content and check
    let mydiv2=document.createElement("div");
    mydiv2.classList.add(`div2`);
    mydiv2.setAttribute('id', count1);
      //buttons (edit , delete)
    let icon=document.createElement("div");
    icon.innerHTML='<i class="fa-regular fa-circle-check check"></i>';
    icon.classList.add("true");
  
    let icondele=document.createElement("button");
    let iconedit=document.createElement("button");
    let icons=document.createElement("button");
    icondele.classList.add("dele");
    iconedit.classList.add("edit");
    icons.classList.add("iconstwo");
    let p=document.createElement("p");
    icondele.innerHTML='<i class="fa-solid fa-xmark"></i>';
    iconedit.innerHTML=`<i class="fa-solid fa-pen-to-square"></i>`;
    if(c)
    {
        p.classList.add("line");
        icon.classList.add("sign");
    }
    p.innerHTML=input;
    
    mydiv2.append(icon);
    mydiv2.append(p);
    mydiv.appendChild(mydiv2);
    icons.append(iconedit);
    icons.append(icondele);
    mydiv.appendChild(icons);
    mydiv.append(alret);
    document.getElementById("bigcontainer").append(mydiv);
    document.getElementById("inp").value="";
    document.getElementById("inp").placeholder="The task has been added successfully";
     
    done();
    edit_task();
    alert();
cancel_alert();
deletediv();
    
 }
   
   function  done(){
    let all_p = document.querySelectorAll(".div2");
    for(var i=0;i<all_p.length;i++)
    {
        all_p[i].onclick=function()
        {
            let child2=this.children[1];
            if(child2.classList.contains("line"))
            {
                // console.log(this.getAttribute("id"));
                compeletetasks[this.getAttribute("id")]=("notcompelete!!");
                child2.classList.remove("line");
            }
            else
            {
                // console.log(this.getAttribute("id"));
                compeletetasks[this.getAttribute("id")]=(child2.innerHTML);
                // console.log(compeletetasks[this.getAttribute("id")]);
                child2.classList.add("line");
            }
            let child1=this.children[0];
            if(child1.classList.contains("sign"))
            {
                child1.classList.remove("sign");
            }
            else
            {
                child1.classList.add("sign"); 
            }
            save_task();
        }
    }
}
function alert(){
    let buttons=document.querySelectorAll("button.dele");
    for(var i=0;i<buttons.length;i++)
    {
        buttons[i].onclick=function()
        {
            let x=this.parentNode;
            let alertdiv=x.nextSibling;
            if(alertdiv.classList.contains("hide-alert"))
                alertdiv.classList.remove("hide-alert");
        }
       
    }
   }
function edit_task()
{
    let edit_icons=document.querySelectorAll(".edit");
    for(let i=0;i<edit_icons.length;i++)
    {
        edit_icons[i].onclick=function()
        {
            let parent=this.parentNode;
            let text=parent.previousSibling;
            let parg=text.lastChild;
            let x=0;
           for(let j=0;j<tasklist.length;j++)
           {
            if(tasklist[j]===parg.innerHTML)
            {
                x=i;
                break;
            }
           }
            // document.getElementById("inp").value=parg.innerHTML;
            if(this.classList.contains("trans"))
            {
                parg.innerHTML=document.getElementById("inp").value;
                tasklist[x]=document.getElementById("inp").value;
                this.innerHTML=`<i class="fa-solid fa-pen-to-square"></i>`;
                this.classList.remove("trans");
                document.getElementById("inp").value="";
                document.getElementById("inp").placeholder="The task has been modified  successfully";
                save_task();
            }
            else
            {
                this.classList.add("trans");
                document.getElementById("inp").value=parg.innerHTML;
                this.innerHTML=`<i class="fa-solid fa-check"></i>`;
            }
          
        }
    }
}

function cancel_alert()
{
    let alertdivs=document.querySelectorAll(".cancel");
    for(let i=0;i<alertdivs.length;i++)
    {
        alertdivs[i].onclick=function()
        {
            let x=this.parentNode;
            let x2=x.parentNode;
            x2.classList.add("hide-alert");

        }
    }
   
}
function deletediv()
{
    let deletdivs=document.querySelectorAll(".delet_task");
    for(let i=0;i<deletdivs.length;i++)
    {
        deletdivs[i].onclick=function()
        {
            let x=this.parentNode;
            let x2=x.parentNode;
            let classes =x2.parentNode;
            classes.classList.add("hide");
            let pargraph=classes.firstChild;
            let text=pargraph.lastChild.innerHTML;
           
            tasklist=tasklist.filter(elme=>elme!==text);
            counter--;
           compeletetasks[pargraph.getAttribute("id")]="deleted";
           compeletetasks=compeletetasks.filter(elme=>elme!=="deleted");
            save_task();
        }
    }
   
}
