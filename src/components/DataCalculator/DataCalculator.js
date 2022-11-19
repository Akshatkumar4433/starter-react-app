import React from "react";


class DataCalculatorDashboard extends React.Component {
    state = {
        cells: [{id:1,name:'$10', start:5,increments:0, end:0}],
    }

    updateIncrements = (id, increment) => {
        const cells = this.state.cells.map(cell => {
            if (cell.id === id) {
                cell.increments += increment
            }
            return cell
        })
        this.setState({cells:cells})
    }
    
    render() {
        return (
            <div>
                   <Row
                        id = {this.state.cells[0].id}
                        name = {this.state.cells[0].name}
                        start = {this.state.cells[0].start}
                        increments = {this.state.cells[0].increments}
                        end = {this.state.cells[0].end}
                        updateIncrements = {this.updateIncrements}
                   />     
                    
            </div>
        );
    };
};

class Row extends React.Component {
    //Make a constructor
    state = {
        incrementValue:0,
        start:0,
        end:0,
        startDisabled:true,
        endDisabled: true,
    }

    handleRow = (event) => {
        this.props.updateIncrements(this.props.id,
             this.state.incrementValue)
        event.preventDefault();
        
    }

    handleValueChange = (event) => {
         //event.target.name
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
                    <label
                        onClick = {this.handleDisable('start')}
                        >start:</label>
                    <input type = 'text'
                        name = 'start' 
                        value = {this.props.start}
                        disabled = {this.state.startDisabled}
                        onChange = {this.handleValueChange}
                    />
                    <label>increment:</label>
                    <input type = 'text'
                        name = 'increment'
                        onChange={this.handleValueChange}
                        value = {this.state.incrementValue}
                    />
                    <label
                        onClick = {this.handleDisable('end')}
                    >
                        end:
                    </label>
                    <input type = 'text' 
                        name = 'end'
                        value = {this.props.end}
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