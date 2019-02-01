const x = {
    cure:{
        max:5,
        validate:(self)=>{
            let {selectedCards} = self.state;
            console.log(selectedCards);
            if(selectedCards.length === 5){
                let disease = selectedCards[0].disease;
                for(let i = 1; i< selectedCards.length; i++){
                    if(selectedCards[i].disease !== disease){
                        return {status:false, msg:"Selected cards must be the same disease."};
                    }
                }
                return {status:true};
            }else{
                return {status:false, msg:"Must select 5 cards."};
            }
        }
    },
    discard:{
        max:2,
        validate:(self)=>{
            let {cards, selectedCards} = self.state;
            if(cards.length - selectedCards.length <= 7){
                return {status:true}
            }else{
                return {status:false, msg:"Player can only hold 7 cards."}
            }
        }
    }
}

export default x;