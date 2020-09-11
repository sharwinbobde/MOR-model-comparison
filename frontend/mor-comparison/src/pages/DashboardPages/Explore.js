import React from "react";
import { FirebaseContext } from "../../components/Firebase";
import '../../styles/GlobalStylesheet.css'
import { TextField, CircularProgress } from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete'

class Explore extends React.Component {

    state = {
        options: ["hell"],
        loading: false
    }

    render() {
        return (
            <FirebaseContext.Consumer>
                {context => {
                    return (
                        <div className="GenericContainer">
                            <h1>Explore others' work and link to yourself.</h1>

                            <Autocomplete
                                getOptionSelected={(option, value) => option === value}
                                getOptionLabel={(option) => option}
                                options={this.state.options}
                                loading={this.state.loading}
                                renderInput={params => (
                                    <TextField
                                        label="Search by email"
                                        variant="outlined"
                                        InputProps={{
                                            ...params.InputProps,
                                            endAdornment: (
                                                <React.Fragment>
                                                    {this.state.loading ? <CircularProgress color="inherit" size={20} /> : null}
                                                    {params.InputProps.endAdornment}
                                                </React.Fragment>
                                            ),
                                        }}
                                    />
                                )}
                            />
                        </div>
                    )
                }}
            </FirebaseContext.Consumer>
        )
    }
}

export default Explore