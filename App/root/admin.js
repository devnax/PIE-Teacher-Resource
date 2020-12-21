import { Provider } from "react-redux";
import { Container, Paper } from "@material-ui/core";
import '@sass/style.scss'
import ControlerBar from "@components/ControllerBar";
import FileContainer from "@components/FileContainer";
import store from "@redux/store";

const App = () => {

    return (
        <Provider store={store}>
            <Container>
                <Paper elevation={0}>
                    <ControlerBar />
                    <FileContainer />
                </Paper>
            </Container>
        </Provider>
    )
}


ReactDOM.render(<App />, document.getElementById('pt-root'));