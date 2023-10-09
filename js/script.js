function calcDate() {
    /*
    * calcDate() : Calculates the difference between two dates
    * @date1 : "First Date in the format MM-DD-YYYY"
    * @date2 : "Second Date in the format MM-DD-YYYY"
    * return : Array
    */

    //new date instance
    const dt_date1 = new Date(Date.now());
    const dt_date2 = new Date("12-12-2023");

    //Get the Timestamp
    const date1_time_stamp = dt_date1.getTime();
    const date2_time_stamp = dt_date2.getTime();

    let calc;

    //Check which timestamp is greater
    if (date1_time_stamp > date2_time_stamp) {
        calc = new Date(date1_time_stamp - date2_time_stamp);
    } else {
        calc = new Date(date2_time_stamp - date1_time_stamp);
    }
    //Retrieve the date, month and year
    const calcFormatTmp = calc.getDate() + '-' + (calc.getMonth() + 1) + '-' + calc.getFullYear();
    //Convert to an array and store
    const calcFormat = calcFormatTmp.split("-");
    //Subtract each member of our array from the default date
    const days_passed = Number(Math.abs(calcFormat[0]) - 1);
    const months_passed = Number(Math.abs(calcFormat[1]) - 1);
    const years_passed = Number(Math.abs(calcFormat[2]) - 1970);


    //Set up custom text
    const yrsTxt = ["year", "years"];
    const mnthsTxt = ["month", "months"];
    const daysTxt = ["day", "days"];

    //Convert to days and sum together
    const total_days = (years_passed * 365) + (months_passed * 30.417) + days_passed;
    const total_secs = total_days * 24 * 60 * 60;
    const total_mins = total_days * 24 * 60;
    const total_hours = total_days * 24;
    const total_weeks = ( total_days >= 7 ) ? total_days / 7 : 0;

    //display result with custom text
    const result = ((years_passed == 1) ? years_passed + ' ' + yrsTxt[0] + ' ' : (years_passed > 1) ?
        years_passed + ' ' + yrsTxt[1] + ' ' : '') +
        ((months_passed == 1) ? months_passed + ' ' + mnthsTxt[0] : (months_passed > 1) ?
            months_passed + ' ' + mnthsTxt[1] + ' ' : '') +
        ((days_passed == 1) ? days_passed + ' ' + daysTxt[0] : (days_passed > 1) ?
            days_passed + ' ' + daysTxt[1] : ''  
            ) ;

    //return the result
    return {
        "total_days": Math.round(total_days),
        "total_weeks": Math.round(total_weeks),
        "total_hours" : Math.round(total_hours),
        "total_minutes" : Math.round(total_mins),
        "total_seconds": Math.round(total_secs),
        "result": result.trim()
    }

}

function calculoEspacila(){
    let result = calcDate();
    let total = result.total_seconds;

    let minutosRestantes = (total / 60) 
    let minutoEntero = Math.trunc(minutosRestantes);
    let minutoFraccion = Number((minutosRestantes-minutoEntero).toFixed(2))
    let segundos = Math.trunc(minutoFraccion * 60)

    let horasRestantes = minutoEntero / 60
    let horasEntero = Math.trunc(horasRestantes)
    let horasFraccion = Number((horasRestantes-horasEntero).toFixed(2))
    let minutos = Math.trunc(horasFraccion * 60) +1

    let diasRestatantes = horasEntero / 24
    let diasEntero = Math.trunc(diasRestatantes)
    let diasFraccion = Number((diasRestatantes - diasEntero).toFixed(2))
    let horas = Math.trunc(diasFraccion * 24)

   

    return {
        segundos : segundos,
        minutos : minutos,
        horas : horas,
        dias : diasEntero,
        restar : () => {
            if(segundos > 0){
                segundos--
            }else if (segundos === 0){
                segundos = 60
                if(minutos > 0){
                    minutos--
                }else if(minutos === 0){
                    minutos = 60
                    if(horas > 0){
                        horas--
                    }else if(horas === 0){
                        horas = 24
                        if(dias > 0){
                            dias--
                        }
                    }
                }
            }
        }
    }

}