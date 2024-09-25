const buttons=document.querySelectorAll('.playbut')
const valPlayer=document.querySelector('.valPlayer')
const valComputer=document.querySelector('.valComputer')
const startButton=document.querySelector('.start')
const instructions= document.querySelector('.instructions')

class Game{
    constructor(){
               
    }
   start(){ 

        startButton.classList.add('started')
        buttons.forEach((x)=>x.disabled=false)
        document.querySelector('.round').innerHTML=`Round: <span class='num'>1</span>`
        document.querySelector('.result').textContent=''
       instructions.textContent='Click on one of the following buttons'     
       document.querySelector('.playerpoints').innerHTML=`Player Points:<span class='pp'>0</span>`
       document.querySelector('.computerpoints').innerHTML=`Computer Points:<span class='cp'>0</span>`
       startButton.disabled=true
    }
    
   async round(){
    
    valPlayer.textContent=event.target.value
    const res =await fetch(`/api`)
    const data =await res.json()
    valComputer.textContent=data.computerVal
     document.querySelector('.num').textContent++
    
   
    if(valComputer.textContent==='Rock' && valPlayer.textContent==='Paper'){
        document.querySelector('.result').textContent='Player won'
        document.querySelector('.pp').textContent++
    }
    else if(valPlayer.textContent==='Rock' && valComputer.textContent==='Paper'){
        document.querySelector('.result').textContent='Computer won'
        document.querySelector('.cp').textContent++

    }
    else if(valComputer.textContent==='Rock' && valPlayer.textContent==='Scissor'){
        document.querySelector('.result').textContent='Computer won'
        document.querySelector('.cp').textContent++
    }
    else if(valPlayer.textContent==='Rock' && valComputer.textContent==='Scissor'){
        document.querySelector('.result').textContent='Player won'
        document.querySelector('.pp').textContent++
    }
    else if(valPlayer.textContent==='Paper' && valComputer.textContent==='Scissor'){
        document.querySelector('.result').textContent='Computer won'
        document.querySelector('.cp').textContent++
    }
    else if(valComputer.textContent==='Paper' && valPlayer.textContent==='Scissor'){
        document.querySelector('.result').textContent='Player won'
        document.querySelector('.pp').textContent++
    }
    else{
        document.querySelector('.result').textContent='Draw'
    }
    if(document.querySelector('.num').textContent==10){
    this.finish()}
     
}
finish(){
    
        startButton.classList.remove('started')
        if(document.querySelector('.pp').textContent>document.querySelector('.cp').textContent){
            if(document.querySelector('.pp').textContent-document.querySelector('.cp').textContent!=1){
            document.querySelector('.result').textContent=`Game finished.The Player won by ${document.querySelector('.pp').textContent-document.querySelector('.cp').textContent} points.Click Start to restart the game`
             }
            else{ document.querySelector('.result').textContent=`Game finished.The Player won by ${document.querySelector('.pp').textContent-document.querySelector('.cp').textContent} point.Click Start to restart the game`}
    

            }
    
        else if(document.querySelector('.cp').textContent>document.querySelector('.pp').textContent){
                if(document.querySelector('.cp').textContent-document.querySelector('.pp').textContent!=1){
                            document.querySelector('.result').textContent=`Game finished.The Computer won by ${document.querySelector('.cp').textContent-document.querySelector('.pp').textContent} points.Click Start to restart the game`
                }
                else{
                            document.querySelector('.result').textContent=`Game finished.The Computer won by ${document.querySelector('.cp').textContent-document.querySelector('.pp').textContent} point.Click Start to restart the game`
                }
            }
        else{
        document.querySelector('.result').textContent='Game Draw.Click Start to restart the game'}
         buttons.forEach((x)=>x.disabled=true)
         startButton.disabled=false
         startButton.addEventListener('click',()=>{
            this.start()
         })
        

    }
    
}

let game=new Game()
startButton.addEventListener('click',()=>{
    game.start()
    buttons.forEach((button)=>button.addEventListener('click',()=>{
        game.round()
        },true))
    
})






    