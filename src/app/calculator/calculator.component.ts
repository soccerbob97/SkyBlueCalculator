import { Component } from '@angular/core';
import { OnInit} from '@angular/core';
import { ThrowStmt } from '@angular/compiler';



@Component ({
    selector:'app-calculator ',
    templateUrl:'./calculator.component.html',
    styleUrls: ['./calculator.component.css']
    

})

export class CalculatorComponent {
    numbersList = [];
    operations = [];
    pos = 0;
    strNum = "";  
    value = 0;
    calculatorDiv = document.getElementById("buttonNumber");
    textValue = document.getElementById("numberText");
    fullOperations = [""];
    fullPos = 0;
    isOper = false;
    delete = 1;
   
 
    //make a clear button
   ngOnInit() {
      this.textValue = document.getElementById("numberText");
      this.calculatorDiv = document.getElementById("buttonNumber");
      
   }  //intializes html dom elements

    numberOnClick(numberPos) {
        
        let children = this.calculatorDiv.children;
        this.strNum += children[numberPos].innerHTML; //adds the button number to a string
        
       
        
        if(this.textValue.innerHTML.length > 23) { 
            this.textValue.innerHTML = this.strNum.substring(this.delete);
            this.delete++;
        } else { //decreases the length of number on the calculator so that it can fit its bound
            this.textValue.innerHTML = this.strNum;
        } //assigns the number on the calculator 
         
        if (!this.isOper) {
            this.fullOperations[this.fullPos] += children[numberPos].innerHTML;
        } else {
            this.fullOperations.push(this.strNum);
            this.isOper = false;
        } //Operation history updated: Adds to current calculation or starts a new one
        
    } //onClick for number button, adds number to the calculator text

    operationOnClick(numberPos) {
        
        let children = this.calculatorDiv.children;
        this.numbersList.push(this.strNum);
        this.operations.push(children[numberPos].innerHTML);
        //Adds number to an array and adds operation to another array
        this.textValue.innerHTML = children[numberPos].innerHTML;
        if (!this.isOper) {
            this.fullOperations[this.fullPos] += children[numberPos].innerHTML;
        } else {
            this.fullOperations.push(this.strNum + children[numberPos].innerHTML);
            this.isOper = false;
        }  //Operation history updated: Adds to current calculation or starts a new one
        this.strNum = "";
    } //onClick for operation buttons, adds operator to calculator text 

    equalsButton() { 
        let children = this.calculatorDiv.children;
        this.numbersList.push(this.strNum);
        this.strNum = "";
        let value1 = 0;
        let value2 = 0;
        for (; this.pos < this.operations.length; this.pos++) {
            if (this.pos  + 1 >= this.numbersList.length) {
                break;
            } //see if u can put outside for loop
            value1 = Number(this.numbersList[this.pos]);
            value2 = Number(this.numbersList[this.pos+1]) ;
            if (this.operations[this.pos] == "*" ) {
                this.value = value1 * value2;
                this.change();
                continue;
            } else if (this.operations[this.pos] == "/" ) {
                this.value = value1 / value2;
                this.change();
                continue;
            }  
        } //calculates the operations that include divide and multiply

        this.pos = 0;
        for (; this.pos < this.operations.length; this.pos++) {
            if (this.pos  + 1 >= this.numbersList.length) {
                break;
            }
            value1 = Number(this.numbersList[this.pos]);
            value2 = Number(this.numbersList[this.pos+1]) ;
            if (this.operations[this.pos] == "+" ) {
                this.value = value1 + value2;
                this.change();
                continue;
            } else if (this.operations[this.pos] == "-" ) {
                this.value = value1 - value2;
                this.change();
                continue;
            }  
        }//calculates the operations that include add and subtract
        this.pos = 0;
        this.textValue.innerHTML = this.numbersList[0];
        this.strNum = this.numbersList[0];
        this.fullOperations[this.fullPos] += "=" + this.numbersList[0] ;
        this.fullPos++;
        this.delete = 0;
        this.isOper = true;
        this.numbersList.splice(0, this.numbersList.length);
        this.operations.splice(0, this.operations.length);
        //resets arrays and makes result value the starting value        
    } //Calculates the expression and display it in the calculator and the history


    change() {
        this.numbersList.splice(this.pos,2,this.value.toString());
        this.operations.splice(this.pos,1);
        this.pos--;
    } //multiplies two numbers

    /*

    divide() {
        let value1 = Number(this.numbersList[this.pos]);
        let value2 = Number(this.numbersList[this.pos+1]) ;
        this.value = value1 / value2;
        this.numbersList.splice(this.pos,2,this.value.toString());
        this.operations.splice(this.pos,1);
        this.pos--;
    } // divdes two numbers

    add() {
        let value1 = Number(this.numbersList[this.pos]);
        let value2 = Number(this.numbersList[this.pos+1]) ;
        this.value = value1 + value2;
        this.numbersList.splice(this.pos,2,this.value.toString());
        this.operations.splice(this.pos,1);
        this.pos--;
    } //adds two numbers

    subtract() {
        let value1 = Number(this.numbersList[this.pos]);
        let value2 = Number(this.numbersList[this.pos+1]) ;
        this.value = value1 - value2;
        this.numbersList.splice(this.pos,2,this.value.toString());
        this.operations.splice(this.pos,1);
        this.pos--;
    } //subtracts two numbers
    */


    clear() { 
        this.numbersList.splice(0, this.numbersList.length);
        this.operations.splice(0, this.operations.length);
        this.fullOperations[this.fullPos] = "";
        this.isOper = false;
        this.strNum = "";
        this.textValue.innerHTML = "";
        this.delete = 0;
        
    } //onClick for the clear button on calculator

    fullClear() { 
        this.numbersList.splice(0, this.numbersList.length);
        this.operations.splice(0, this.operations.length);
        this.fullOperations= [""] 
        this.fullPos =0;
        this.isOper = false;
        this.strNum = "";
        this.textValue.innerHTML = "";
        this.delete = 0;
        
    } //onClick for clearing history 

    
   
   
    


  
    


}