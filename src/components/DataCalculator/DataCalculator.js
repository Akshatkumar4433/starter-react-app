import React from "react";


class DataCalculatorDashboard extends React.Component {
    state = {
        cells: [{id:1,name:'$10', start:5,increments:0, end:0}],
    }

    updateIncrements = (key, increment) => {
        const cells = this.state.cells.map((cell) => { 
                            if (cell.id === key) {
                                cell.increments += Number(increment)
                                return cell;
                            }
                            else {
                                return cell
                            }

        })
        console.log(cells)


    }
    
    render() {
        return (
            <div>
                        <RawColumn/>
                        <IncrementColumn
                            updateIncrements = {this.updateIncrements}
                            id = {1}
                        />
                        <RawColumn/>
                    
            </div>
        );
    };
};


class IncrementColumn extends React.Component {
     constructor(props) {
         super(props);
         this.state = {
             //is this prop important?
             increments:this.props.increments,
             increment:0
         }
    }
    handleSubmit = (event) => {
        const key = this.props.id;
        const increment = this.state.increment;
        this.props.updateIncrements(key,increment)
        event.preventDefault();
    }
    
    handleInput = (event)=> {
        this.setState({increment:event.target.value})
    }


    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type = 'text'
                        value = {this.state.increment}
                        onChange = {this.handleInput}
                    />
                </form>    
            </div>
        )
    }
}

class RawColumn extends React.Component {
    state = {
        text: ''
    }
    handleInput = (event)=> {
        this.setState({text:event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault();
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input 
                        type='text'
                        onChange={this.handleInput}
                        value = {this.state.text}
                    />
                </form>
            </div>
        );
    }
}



export default DataCalculatorDashboard;