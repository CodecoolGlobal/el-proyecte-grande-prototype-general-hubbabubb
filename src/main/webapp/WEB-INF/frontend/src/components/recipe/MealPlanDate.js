import {MuiPickersUtilsProvider, DateTimePicker} from "@material-ui/pickers";
import {useState} from "react";
import {postFetchWithAuth} from "../../util/fetchData";
import AuthenticationService from "../../util/AuthenticationService";
import DateFnsUtils from "@date-io/date-fns";
import {hostName} from "../../util/constants";

function MealPlanDate(props) {
    const WEEK_DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const [pickedDate, setPickedDate] = useState(new Date());
    const [saved, setSaved] = useState(false);
    const [dateFormat, setDateFormat] = useState(null);

    function timeFormat(time) {
        return time < 10 ? "0"+time : time;
    }

    const saveMealPlan = () => {
        let minute = timeFormat(pickedDate.getMinutes());
        let hour = timeFormat(pickedDate.getHours());
        let day = timeFormat(pickedDate.getDate());
        let month = timeFormat(pickedDate.getMonth()+1);
        let date = "" + pickedDate.getFullYear() +"-"+ month +"-"+ day + " " + hour + ":" + minute;
        setDateFormat(date);
        const body = {
            "recipeId": props.recipeId,
            "date": date,
            "userName": AuthenticationService.getLoggedInUserName()
        }
        console.log(body);
        postFetchWithAuth(`${hostName}/api/v1/meal-plan/save`, body,
            (data) => {
                console.log(data);
            },
            (error) => {console.log(error);})
        setSaved(true);
    };

    return (
            <div>
                { saved ? <p>Saved for {dateFormat} - {WEEK_DAYS[pickedDate.getDay()]}</p> :
                <div>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DateTimePicker value={pickedDate} onChange={(date) => setPickedDate(date)} />
                    </MuiPickersUtilsProvider>
                    <button onClick={saveMealPlan}>Add to Meal Plan</button>
                </div>}
            </div>
    );
}

export default MealPlanDate;