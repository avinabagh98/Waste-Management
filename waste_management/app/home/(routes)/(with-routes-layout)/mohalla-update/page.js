
"use client";

import styles from "@/app/home/(routes)/(with-routes-layout)/mohalla-add/mohalla.module.css";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import LanguageFetcher from "@/components/LanguageFetcher";
import axios from "axios";
import swal from "sweetalert";
import Header from "@/components/Header/Header";
import Surveyques from "@/components/Surveyques";
import SurveyDropdown from "@/components/SurveyDropdown";
import Textparser from "@/components/Textparser";
import { sendRequest } from "@/api/sendRequest";
import FormSkeletonLoader from "@/components/FormSkeletonLoader";

export default function Mohallapage() {


    //State variables
    const [userRole, setUserRole] = useState("");
    const [token, setToken] = useState("");

    //form-data states
    const [dateOfMeetingMohalla, setDateOfMeetingMohalla] = useState("");
    const [supervisor, setSupervisor] = useState("");
    const [fieldStaffMohalla, setFieldStaffMohalla] = useState("");
    const [wardNoGPMohalla, setWardNoGPMohalla] = useState("");
    const [localityNameVillageMohalla, setLocalityNameVillageMohalla] =
        useState("");
    const [mohallaCommiteeMohalla, setMohallaCommiteeMohalla] = useState("");
    const [householdsUnderMCMohalla, setHouseholdsUnderMCMohalla] = useState("");
    const [
        householdDoingSegregationMohalla,
        setHouseholdDoingSegregationMohalla,
    ] = useState("");
    const [hhPayingUserChargesMohalla, setHhPayingUserChargesMohalla] =
        useState("");
    const [
        userChargesCollectedRsPerMonthMohalla,
        setUserChargesCollectedRsPerMonthMohalla,
    ] = useState("");
    const [salaryPaidToWastePickerMohalla, setSalaryPaidToWastePickerMohalla] =
        useState("");
    const [otherExpensesInRsMohalla, setOtherExpensesInRsMohalla] = useState("");
    const [
        isTheWasteCollectorRegularMohalla,
        setIsTheWasteCollectorRegularMohalla,
    ] = useState("");
    const [
        isTheWasteComingToComposter1Mohalla,
        setIsTheWasteComingToComposter1Mohalla,
    ] = useState("");
    const [
        isTheWasteComingToComposter2Mohalla,
        setIsTheWasteComingToComposter2Mohalla,
    ] = useState("");
    const [manureGeneratedInKgMohalla, setManureGeneratedInKgMohalla] =
        useState("");
    const [manureSoldInKgMohalla, setManureSoldInKgMohalla] = useState("");
    const [incomeFromManureSoldInRsMohalla, setIncomeFromManureSoldInRsMohalla] =
        useState("");
    const [
        noOfHhsTakingHomeCompostingMohalla,
        setNoOfHhsTakingHomeCompostingMohalla,
    ] = useState("");
    const [balanceInRsMohalla, setBalanceInRsMohalla] = useState("");

    const [mohallas, setMohallas] = useState([]);
    const [mohallaName, setMohallaName] = useState([]);
    const [mohallaId, setMohallaId] = useState("");
    const [userId, setUserId] = useState("");
    const [supervisorId, setSupervisorId] = useState("");
    const [locality, setLocality] = useState([]);
    const [localName, setLocalName] = useState([]);
    const [localityId, setLocalityId] = useState([]);
    const [id, setId] = useState("");

    //Loading Header Data States
    const [name, setName] = useState("");
    const [wardId, setWardId] = useState("");
    const [district_name, setDistrictName] = useState("");
    const [block_name, setBLockName] = useState("");

    //Loader states
    const [isLoading, setIsLoading] = useState(true);
    const [spinner, setSpinner] = useState(false);

    //Common Other declarations///
    const loadingHeaderData = {
        name: name,
        district_name: district_name,
        ward_id: wardId,
        block_name: block_name,
        supervisor: supervisor,
    };


    const dropDownBody = {
        token: token,
        wardId: wardId,
    };

    const booleanOption = ["no", "yes"];


    const formDatamohallaUpdate = {
        id: id,
        token: token,
        dateOfMeeting: dateOfMeetingMohalla,
        supervisorId: supervisorId,
        fieldStaffId: userId,
        wardId: wardId,
        localityId: localityId,
        mohollaCommitteeId: mohallaId,
        householdMc: householdsUnderMCMohalla,
        householdSegregation: householdDoingSegregationMohalla === "yes" ? "1" : "0",
        hhUserPayCharge: hhPayingUserChargesMohalla,
        userChargeCollection: userChargesCollectedRsPerMonthMohalla,
        salaryPaidWastePicker: salaryPaidToWastePickerMohalla,
        otherExpense: otherExpensesInRsMohalla,
        isWastecollectorRegular: isTheWasteCollectorRegularMohalla,
        isWastecomingComposter1: isTheWasteComingToComposter1Mohalla,
        isWastecomingComposter2: isTheWasteComingToComposter2Mohalla,
        manureGenerated: manureGeneratedInKgMohalla,
        manureSold: manureSoldInKgMohalla,
        incomeFromManureSold: incomeFromManureSoldInRsMohalla,
        noOfUndertakenHomeComposting: noOfHhsTakingHomeCompostingMohalla,
        balance: balanceInRsMohalla,
    };



    const route = useRouter();
    const translate = LanguageFetcher();

    // LocalStorage Fetching
    useEffect(() => {
        localStorage.setItem("previousPath", "/home/mohalla-list");
        try {
            async function fetchData() {
                const token = await localStorage.getItem("token");
                if (!token) {
                    route.push("/home/login");
                } else {
                    setToken(token);
                    setUserRole(localStorage.getItem("role_name"));

                    //loadingHeaderData from local storage
                    setName(localStorage.getItem("name"));
                    setDistrictName(localStorage.getItem("district"));
                    setBLockName(localStorage.getItem("block"));
                    setWardId(localStorage.getItem("ward_id"));
                    setUserId(localStorage.getItem("user_id"));

                    // add data to the form
                    setWardNoGPMohalla(localStorage.getItem("ward_id"));
                    setFieldStaffMohalla(localStorage.getItem("name"));
                    setId(localStorage.getItem("id"));


                }
            }
            fetchData();
        } catch (error) {
            swal("Error", error.message, "error");
        }
    }, []);

    // Getting Mohalla BY id
    useEffect(() => {
        async function showData() {
            try {
                // Weekly waste collection By Id

                const res = await sendRequest(
                    "post",
                    "/mohollacommitteeMeeting/id",
                    { token, id },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                if (res.status === 1) {

                    setIsLoading(false);
                    console.log("Response mohalla committee by id", res.data.data.list);

                    //inserting data to the respected fields
                    const api_response = res.data.data.list;

                    setDateOfMeetingMohalla(api_response.date_of_meeting);
                    setSupervisorId(api_response.supervisor_id);
                    setSupervisor(localStorage.getItem("supervisor"));
                    setFieldStaffMohalla(api_response.field_staff_id);
                    setWardNoGPMohalla(api_response.ward_id);
                    setLocalityId(api_response.locality_id);
                    setMohallaId(api_response.moholla_committee_id);
                    setHouseholdsUnderMCMohalla(api_response.household_mc);
                    setHouseholdDoingSegregationMohalla(api_response.household_segregation === "1" ? "yes" : "no");
                    setHhPayingUserChargesMohalla(api_response.hh_user_pay_charge);
                    setUserChargesCollectedRsPerMonthMohalla(api_response.user_charge_collection);
                    setSalaryPaidToWastePickerMohalla(api_response.salarypicker_wastepicker);
                    setOtherExpensesInRsMohalla(api_response.other_expense);
                    setIsTheWasteCollectorRegularMohalla(api_response.is_wastecollector_regular);
                    setIsTheWasteComingToComposter1Mohalla(api_response.is_wastecoming_composter1);
                    setIsTheWasteComingToComposter2Mohalla(api_response.is_wastecoming_composter2);
                    setManureGeneratedInKgMohalla(api_response.manure_generated);
                    setManureSoldInKgMohalla(api_response.manure_sold);
                    setIncomeFromManureSoldInRsMohalla(api_response.incomefrom_manuresold);
                    setNoOfHhsTakingHomeCompostingMohalla(api_response.no_of_undertaken_homecomposting);
                    setBalanceInRsMohalla(api_response.balance);



                }
            } catch (error) {
                console.log("Error at weekly waste collection by id::", error);
            }
        }
        showData();
    }, [token]);



    // Mohalla Committee List Dropdown Fetching
    useEffect(() => {
        try {
            async function fetchDropdown() {
                const response = await sendRequest(
                    "post",
                    `/mohollacommittee/List`,
                    dropDownBody,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                if (response.status === 1) {
                    console.log(response.data.data.lists);

                    setMohallas(response.data.data.lists);
                    const mohallas_name = response.data.data.lists.map(
                        (item) => item.committee_name
                    );
                    setMohallaName(mohallas_name);
                }
            }

            fetchDropdown();
        } catch (error) {
            console.log(error);
        }
    }, [token]);

    // Mohalla Committee List Dropdown State Update --for update api
    useEffect(() => {
        if (mohallas.length > 0) {
            const mohallaNames = mohallas.map((mohalla) => mohalla.committee_name);
            setMohallaName(mohallaNames);
            //   from ID to Name Update in dropdown
            const mohallaname = mohallas.filter((item) => item.id === mohallaId);
            setMohallaCommiteeMohalla(mohallaname[0]?.committee_name);

        }
    }, [mohallas]);

    // Locality By Ward API Calling
    useEffect(() => {
        try {
            async function fetchDropdown() {
                const response = await sendRequest(
                    "post",
                    `/localitylist/List`,
                    dropDownBody,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.status === 1) {
                    console.log(
                        `Locality lists in ward ${wardId} from API ::`,
                        response.data.data.incomeList
                    );
                    setLocality(response.data.data.incomeList);
                }
            }


            fetchDropdown();
        } catch (error) {
            console.log(error);
        }
    }, [token]);

    // Locality List Dropdown State Update
    useEffect(() => {
        if (locality.length > 0) {
            const localityaNames = locality.map((locality) => locality.village_name);
            setLocalName(localityaNames);
            //from ID to Name Update in dropdown
            const local = locality.filter((item) => item.id === localityId);
            setLocalityNameVillageMohalla(local[0]?.village_name);

        }
    }, [locality]);

    // Handler Functions

    const handleVal = (id, val) => {
        if (id === "dateOfMeetingMohalla") {
            setDateOfMeetingMohalla(val);
        }
        if (id === "localityNameVillageMohalla") {
            let LVal = locality.filter((item) => item.village_name === val);
            let local_Selected = LVal[0].id;
            setLocalityId(local_Selected);
            setLocalityNameVillageMohalla(val);
        }
        if (id === "mohallaCommiteeMohalla") {
            let mhVal = mohallas.filter((item) => item.committee_name === val);
            let mohallaId_Selected = mhVal[0].id;
            setMohallaId(mohallaId_Selected);
            setMohallaCommiteeMohalla(val);
        }

        if (id === "householdsUnderMCMohalla") {
            setHouseholdsUnderMCMohalla(val);
        }
        if (id === "householdDoingSegregationMohalla") {
            setHouseholdDoingSegregationMohalla(val);
        }
        if (id === "hhPayingUserChargesMohalla") {
            setHhPayingUserChargesMohalla(val);
        }
        if (id === "userChargesCollectedRsPerMonthMohalla") {
            setUserChargesCollectedRsPerMonthMohalla(val);
        }

        if (id === "salaryPaidToWastePickerMohalla") {
            setSalaryPaidToWastePickerMohalla(val);
        }

        if (id === "otherExpensesInRsMohalla") {
            setOtherExpensesInRsMohalla(val);
        }

        if (id === "manureGeneratedInKgMohalla") {
            setManureGeneratedInKgMohalla(val);
        }

        if (id === "manureSoldInKgMohalla") {
            setManureSoldInKgMohalla(val);
        }

        if (id === "incomeFromManureSoldInRsMohalla") {
            setIncomeFromManureSoldInRsMohalla(val);
        }

        if (id === "noOfHhsTakingHomeCompostingMohalla") {
            setNoOfHhsTakingHomeCompostingMohalla(val);
        }

        if (id === "balanceInRsMohalla") {
            setBalanceInRsMohalla(val);
        }


    };

    const handleRadioChange = (e, name) => {
        if (name === "isTheWasteCollectorRegularMohalla") {
            setIsTheWasteCollectorRegularMohalla(e.target.value);
        }
        if (name === "isTheWasteComingToComposter1Mohalla") {
            setIsTheWasteComingToComposter1Mohalla(e.target.value);
        }
        if (name === "isTheWasteComingToComposter2Mohalla") {
            setIsTheWasteComingToComposter2Mohalla(e.target.value);
        }
    };


    const UpdateHandler = async (e) => {

        console.log("Mohalla Form Submitted::", formDatamohallaUpdate);
        //UPDATE API CALLING
        let flag = false;
        e.preventDefault();
        for (const field in formDatamohallaUpdate) {
            if (
                formDatamohallaUpdate[field] === null ||
                formDatamohallaUpdate[field] === ""
            ) {
                flag = true;
                break;
            }
        }
        if (flag) {
            setSpinner(false);
            swal("Error", "Please fill all the fields", "error");
        } else {
            setSpinner(true);
            console.log("Mohalla Update Form Submitted::", formDatamohallaUpdate);
            //UPDATE API CALLING
            const res = await sendRequest(
                "post",
                "/mohollaCommitteemeeting/update",
                formDatamohallaUpdate,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log(res);//testing
            if (res.status === 1) {
                swal("Success", "Updated Successfully", "success");
                route.push("/home/mohalla-list");
            }
        }
    };

    return (
        !isLoading ?
            <>

                {spinner ? <><div className={styles.spinnerContainer}><img src="/svg/loader.svg" alt="loader"></img></div></> : null}
                <Header
                    userRole={userRole}
                    isOffCanvasVisible={false}
                    loadingdata={loadingHeaderData}
                />

                <div className={styles.container}>

                    {/* //breadcrumb */}
                    <div className={styles.breadcrumb}>
                        <Textparser text={"Mohalla Committee Update"} />
                    </div>

                    {/* //List */}
                    <div className={styles.formcontainer}>
                        <Surveyques
                            id={"dateOfMeetingMohalla"}
                            type={"date"}
                            labelText={translate?.Date_of_Meeting_mohalla}
                            value={dateOfMeetingMohalla}
                            required={true}
                            handleVal={(id, val) => handleVal(id, val)}
                        />

                        {/* <Surveyques
                        id={"supervisorMohalla"}
                        labelText={translate?.Supervisor_mohalla}
                        value={supervisorMohalla}
                        required={true}
                        handleVal={(id, val) => handleVal(id, val)}
                    />
                    <Surveyques
                        id={"fieldStaffMohalla"}
                        labelText={translate?.Field_Staff_mohalla}
                        value={fieldStaffMohalla}
                        required={true}
                        handleVal={(id, val) => handleVal(id, val)}
                    />
                    <Surveyques
                        id={"wardNoGPMohalla"}
                        labelText={translate?.Ward_No_GP_mohalla}
                        value={wardNoGPMohalla}
                        required={true}
                        handleVal={(id, val) => handleVal(id, val)}

                    /> */}
                        <SurveyDropdown
                            id={"localityNameVillageMohalla"}
                            labelText={translate?.Locality_Name_Village_mohalla}
                            value={localityNameVillageMohalla}
                            required={true}
                            handleVal={(id, val) => handleVal(id, val)}
                            options={localName}
                        />
                        <SurveyDropdown
                            id={"mohallaCommiteeMohalla"}
                            labelText={translate?.Mohalla_Commitee_mohalla}
                            value={mohallaCommiteeMohalla}
                            required={true}
                            handleVal={(id, val) => handleVal(id, val)}
                            options={mohallaName}
                        />

                        <Surveyques
                            id={"householdsUnderMCMohalla"}
                            labelText={translate?.Households_Under_MC_mohalla}
                            value={householdsUnderMCMohalla}
                            required={true}
                            handleVal={(id, val) => handleVal(id, val)}
                            type={"number"}
                        />

                        <SurveyDropdown
                            id={"householdDoingSegregationMohalla"}
                            labelText={translate?.Household_Doing_Segregation_mohalla}
                            value={householdDoingSegregationMohalla}
                            required={true}
                            handleVal={(id, val) => handleVal(id, val)}
                            options={booleanOption}
                        />

                        <Surveyques
                            id={"hhPayingUserChargesMohalla"}
                            labelText={translate?.HH_Paying_User_Charges_mohalla}
                            value={hhPayingUserChargesMohalla}
                            required={true}
                            handleVal={(id, val) => handleVal(id, val)}
                            type={"number"}
                        />

                        <Surveyques
                            id={"userChargesCollectedRsPerMonthMohalla"}
                            labelText={translate?.User_Charges_Collected_Rs_per_month_mohalla}
                            value={userChargesCollectedRsPerMonthMohalla}
                            required={true}
                            handleVal={(id, val) => handleVal(id, val)}
                            type={"number"}
                        />

                        <Surveyques
                            id={"salaryPaidToWastePickerMohalla"}
                            labelText={translate?.Salary_paid_to_Waste_Picker_mohalla}
                            value={salaryPaidToWastePickerMohalla}
                            required={true}
                            handleVal={(id, val) => handleVal(id, val)}
                            type={"number"}
                        />

                        <Surveyques
                            id={"otherExpensesInRsMohalla"}
                            labelText={translate?.Other_Expenses_in_Rs_mohalla}
                            value={otherExpensesInRsMohalla}
                            required={true}
                            handleVal={(id, val) => handleVal(id, val)}
                            type={"number"}
                        />

                        <div className={styles.radioInput}>
                            <Textparser
                                text={translate?.Is_the_waste_collector_regular_mohalla}
                            />
                            <div className={styles.radioInput_Options}>
                                <span>
                                    <input
                                        type="radio"
                                        id="isTheWasteCollectorRegularMohalla_yes"
                                        name="isTheWasteCollectorRegularMohalla"
                                        value="1"
                                        checked={isTheWasteCollectorRegularMohalla === "1"}
                                        onChange={(e) => {
                                            handleRadioChange(e, e.target.name);
                                        }}
                                    />
                                    <label htmlFor="isTheWasteCollectorRegularMohalla_yes">
                                        Yes
                                    </label>
                                </span>
                                <span>
                                    <input
                                        type="radio"
                                        id="isTheWasteCollectorRegularMohalla_no"
                                        name="isTheWasteCollectorRegularMohalla"
                                        value="0"
                                        checked={isTheWasteCollectorRegularMohalla === "0"}
                                        onChange={(e) => {
                                            handleRadioChange(e, e.target.name);
                                        }}
                                    />
                                    <label htmlFor="isTheWasteCollectorRegularMohalla_no">No</label>
                                </span>
                            </div>
                        </div>

                        <div className={styles.radioInput}>
                            <Textparser
                                text={translate?.Is_the_waste_coming_to_composter_1_mohalla}
                            />
                            <div className={styles.radioInput_Options}>
                                <span>
                                    <input
                                        type="radio"
                                        id="isTheWasteComingToComposter1Mohalla_yes"
                                        name="isTheWasteComingToComposter1Mohalla"
                                        value="1"
                                        checked={isTheWasteComingToComposter1Mohalla === "1"}
                                        onChange={(e) => {
                                            handleRadioChange(e, e.target.name);
                                        }}
                                    />
                                    <label htmlFor="isTheWasteComingToComposter1Mohalla_yes">
                                        Yes
                                    </label>
                                </span>
                                <span>
                                    <input
                                        type="radio"
                                        id="isTheWasteComingToComposter1Mohalla_no"
                                        name="isTheWasteComingToComposter1Mohalla"
                                        value="0"
                                        checked={isTheWasteComingToComposter1Mohalla === "0"}
                                        onChange={(e) => {
                                            handleRadioChange(e, e.target.name);
                                        }}
                                    />
                                    <label htmlFor="isTheWasteComingToComposter1Mohalla_no">
                                        No
                                    </label>
                                </span>
                            </div>
                        </div>

                        <div className={styles.radioInput}>
                            <Textparser
                                text={translate?.Is_the_waste_coming_to_composter_2_mohalla}
                            />
                            <div className={styles.radioInput_Options}>
                                <span>
                                    <input
                                        type="radio"
                                        id="isTheWasteComingToComposter2Mohalla_yes"
                                        name="isTheWasteComingToComposter2Mohalla"
                                        value="1"
                                        checked={isTheWasteComingToComposter2Mohalla === "1"}
                                        onChange={(e) => {
                                            handleRadioChange(e, e.target.name);
                                        }}
                                    />
                                    <label htmlFor="isTheWasteComingToComposter2Mohalla_yes">
                                        Yes
                                    </label>
                                </span>
                                <span>
                                    <input
                                        type="radio"
                                        id="isTheWasteComingToComposter2Mohalla_no"
                                        name="isTheWasteComingToComposter2Mohalla"
                                        value="0"
                                        checked={isTheWasteComingToComposter2Mohalla === "0"}
                                        onChange={(e) => {
                                            handleRadioChange(e, e.target.name);
                                        }}
                                    />
                                    <label htmlFor="isTheWasteComingToComposter2Mohalla_no">
                                        No
                                    </label>
                                </span>
                            </div>
                        </div>

                        <Surveyques
                            id={"manureGeneratedInKgMohalla"}
                            labelText={translate?.Manure_Generated_in_Kg_mohalla}
                            value={manureGeneratedInKgMohalla}
                            required={true}
                            handleVal={(id, val) => handleVal(id, val)}
                            type={"number"}
                        />
                        <Surveyques
                            id={"manureSoldInKgMohalla"}
                            labelText={translate?.Manure_Sold_in_Kg_mohalla}
                            value={manureSoldInKgMohalla}
                            required={true}
                            handleVal={(id, val) => handleVal(id, val)}
                            type={"number"}
                        />

                        <Surveyques
                            id={"incomeFromManureSoldInRsMohalla"}
                            labelText={translate?.Income_from_Manure_Sold_in_Rs_mohalla}
                            value={incomeFromManureSoldInRsMohalla}
                            required={true}
                            handleVal={(id, val) => handleVal(id, val)}
                            type={"number"}
                        />

                        <Surveyques
                            id={"noOfHhsTakingHomeCompostingMohalla"}
                            labelText={translate?.No_of_HHs_taking_Home_Composting_mohalla}
                            value={noOfHhsTakingHomeCompostingMohalla}
                            required={true}
                            handleVal={(id, val) => handleVal(id, val)}
                            type={"number"}
                        />

                        <Surveyques
                            id={"balanceInRsMohalla"}
                            labelText={translate?.Balance_in_Rs_mohalla}
                            value={balanceInRsMohalla}
                            required={true}
                            handleVal={(id, val) => handleVal(id, val)}
                            type={"number"}
                        />

                        <div className={styles.btnContainer} >
                            <button className={styles.submitbtn} onClick={UpdateHandler}>Update</button>
                        </div>
                    </div>
                </div>
            </> :
            <FormSkeletonLoader />
    );
}
