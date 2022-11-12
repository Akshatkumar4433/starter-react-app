import React from "react";


class ShiftDashboard extends React.Component {
    state = {
        workers: ['Akshat', 'Navi', 'Jaspreet'],
        working: '',
        What: '', //think a good binding name.
    }
    
    NewName = (name) => {
        const workers = [...this.state.workers, name];
        this.setState({workers, What: ''});

    }

    handleChange = (name) => {
            this.setState({working:name, What:''})
        
    }

    handleButton = (buttonName) => {
        return () => {
            this.setState({What:buttonName})
        }
    }


    render() {
       if (this.state.What === 'AddName') {
           return (
               <AddName
                    NewName = {this.NewName} 
               />
           )
       }
       else if (this.state.What === 'ChangeShift') {
            return (
                <ChangeShift
                    workers = {this.state.workers}
                    working = {this.state.working}
                    handleChange = {this.handleChange}
                />
            )
        }
        else {
            return (
                <div>
                    <p>Shift Name: {this.state.working}</p>
                    <button onClick = {this.handleButton('ChangeShift')}>Change</button>
                    <button onClick = {this.handleButton('AddName')}>Add</button>
                    <p>{this.state.workers}</p>
                </div>
            )
        }
       }
    }


class ChangeShift extends React.Component {
    handleChange = (name) => {
        return () => {
            this.props.handleChange(name)
        }
    }

    render() {
        return (
            <div>
            <ul>
            {this.props.workers.map((worker,i) =>  
                <button key = {i} onClick = {this.handleChange(worker)}>{worker}</button>
            )}
            </ul>
            </div>
        )
    }
}



class AddName extends React.Component {
    state = {
        name: ''
    }

    onFormSubmit = (event) => {
        this.props.NewName(this.state.name);
        event.preventDefault()
    }

    InputChange = (event) => {
        this.setState({name: event.target.value})
    }
    render() {
        return (
            <div>
                <form onSubmit={this.onFormSubmit}>
                    <input 
                        type = 'text'
                        placeholder="Name"
                        value = {this.state.name}
                        onChange = {this.InputChange}
                    />
                    <input type = 'submit'/>
                </form>
        </div>
        )
    }

}

export default ShiftDashboard;