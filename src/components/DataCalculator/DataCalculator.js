import React from "react";


class DataCalculatorDashboard extends React.Component {
    state = {
        cells: [
            {id:1,name:'$3',price:3, start:76,increment:0, end:74},
            {id:2,name:'$5', price:5, start:56,increment:0, end:50}
        ],
        total:false, //To hide it
    }

    calculateTotal = () => {
         let cells = this.state.cells;
         let total = 0;
         for(let i = 0; i<cells.length; i++) {
             let ticketSold = cells[i].start + cells[i].increment - cells[i].end;
             total += ticketSold * cells[i].price
         }

         this.setState({total:total})
         
    }

    updateValues = (fields,id) => {
        const cells = this.state.cells.map(cell => {
            if (cell.id === id) {
                cell.start = fields.start;
                cell.increment += fields.increment;
                cell.end = fields.end;
            }
            return cell
        })
        this.setState({cells:cells})
        
    }

    render() {
        return (
            <div>
                 {this.state.cells.map(cell => (
                        <Row
                            id = {cell.id}
                            name = {cell.name}
                            start = {cell.start}
                            end = {cell.end}
                            updateValues = {this.updateValues}
                        />
                 ))}

                <div>
                    <button onClick = {this.calculateTotal}>Total</button>
                    {this.state.total}
                </div>
            </div>
        );
    };
};

class Row extends React.Component {
    //Make a constructor
    constructor(props) {
        super(props)
        this.state = {
            fields: {
                increment:0,
                start:this.props.start,
                end: this.props.end,
            },
        }

    }
    

    handleRow = (event) => {
        //send start, incrementValue and end to 
        //parent for update
        this.props.updateValues(this.state.fields,this.props.id)
        const fields = this.state.fields;
        fields.increment = 0;
        this.setState({fields:fields})
        event.preventDefault();
        
    }

    handleValueChange = (event) => {
         let fields = this.state.fields;
         fields[event.target.name] = Number(event.target.value);
         this.setState({fields:fields})
    }

    handleDisable = (input) => {
        return () => {
            if (input === 'start') {
                this.setState({startDisabled: !this.state.startDisabled})
            }
            else {
                this.setState({endDisabled: !this.state.endDisabled})
            }
        
        }
    }
    render() {
        return (
            <div>
                <form onSubmit = {this.handleRow}>
                    <h5>{this.props.name}</h5>
                    <input type = 'text'
                        name = 'start' 
                        value = {this.state.fields.start}
                        disabled = {this.state.startDisabled}
                        onChange = {this.handleValueChange}
                    />
                    
                    <input type = 'text'
                        name = 'increment'
                        onChange={this.handleValueChange}
                        value = {this.state.fields.incrementValue}
                    />
                    <input type = 'text' 
                        name = 'end'
                        value = {this.state.fields.end}
                        disabled = {this.state.endDisabled}
                        onChange = {this.handleValueChange}
                    />
                    <input type = 'submit' value = 'update'/>
                </form>
            </div>
        );
    };
}



export default DataCalculatorDashboard;