import {MuiPickersUtilsProvider, DatePicker} from "@material-ui/pickers";
import {useState} from "react";
import {postFetch, postFetchWithAuth} from "../../util/fetchData";
import AuthenticationService from "../../util/AuthenticationService";
import DateFnsUtils from "@date-io/date-fns";
import {hostName} from "../../util/constants";

function MealPlanDate(props) {

    const [pickedDate, setPickedDate] = useState(new Date());
    const [saved, setSaved] = useState(false);
    let dateFormat;

    const saveMealPlan = () => {
        dateFormat = "" + pickedDate.getFullYear() +"-"+ (pickedDate.getMonth()+1) +"-"+ pickedDate.getDate();
        const body = {
            "recipeId": props.recipeId,
            "date": dateFormat,
            "userName": AuthenticationService.getLoggedInUserName()
        }
        console.log(body);
        postFetchWithAuth(`${hostName}/api/v1/meal-plan/save`, body,
            (data) => {
                console.log(data);
                setSaved(true);
            },
            (error) => {console.log(error);})
    };

    return (
            <div>
                { saved ? dateFormat :
                <div>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker value={pickedDate} onChange={(date) => setPickedDate(date)} />
                    </MuiPickersUtilsProvider>
                    <button onClick={saveMealPlan}>Add to Meal Plan</button>
                </div>}
            </div>
    );
}

export default MealPlanDate;