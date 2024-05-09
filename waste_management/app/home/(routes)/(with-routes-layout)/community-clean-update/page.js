"use client";

import styles from "@/app/home/(routes)/(with-routes-layout)/community-clean-add/comunity.module.css";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import LanguageFetcher from "@/components/LanguageFetcher";
import { sendRequest } from "@/api/sendRequest";
import swal from "sweetalert";
import Header from "@/components/Header/Header";
import Surveyques from "@/components/Surveyques";
import SurveyDropdown from "@/components/SurveyDropdown";
import Textparser from "@/components/Textparser";
import FormSkeletonLoader from "@/components/FormSkeletonLoader";

export default function ComunityCleanpage() {
    //State variables
    const [userRole, setUserRole] = useState("");
    const [token, setToken] = useState("");

    //form-data states
    const [monthAndYearCleaningToilets, setMonthAndYearCleaningToilets] =
        useState("");
    const [communityToiletCleaningToilets, setCommunityToiletCleaningToilets] =
        useState("");
    const [mohallaCommiteeCleaningToilets, setMohallaCommiteeCleaningToilets] =
        useState("");
    const [cleaningToiletCleaningToilets, setCleaningToiletCleaningToilets] =
        useState("");
    const [electricityCleaningToilets, setElectricityCleaningToilets] =
        useState("");
    const [
        cleaningMaterialsCleaningToilets,
        setCleaningMaterialsCleaningToilets,
    ] = useState("");
    const [swiperChargesCleaningToilets, setSwiperChargesCleaningToilets] =
        useState("");
    const [minorRepairCleaningToilets, setMinorRepairCleaningToilets] =
        useState("");
    const [majorRepairCleaningToilets, setMajorRepairCleaningToilets] =
        useState("");
    const [oMCollectorCleaningToilets, setOMCollectorCleaningToilets] =
        useState("");
    const [
        oMRegisterMaintainedCleaningToilets,
        setOMRegisterMaintainedCleaningToilets,
    ] = useState("");
    const [
        sanitaryWasteManagedCleaningToilets,
        setSanitaryWasteManagedCleaningToilets,
    ] = useState("");
    const [
        hygieneTrainingUndertakenCleaningToilets,
        setHygieneTrainingUndertakenCleaningToilets,
    ] = useState("");
    const [
        specialDayCelebratedCleaningToilets,
        setSpecialDayCelebratedCleaningToilets,
    ] = useState("");
    const [allTapFunctionalCleaningToilets, setAllTapFunctionalCleaningToilets] =
        useState("");
    const [allDoorsClosingCleaningToilets, setAllDoorsClosingCleaningToilets] =
        useState("");
    const [conditionOfTilesCleaningToilets, setConditionOfTilesCleaningToilets] =
        useState("");
    const [conditionOfRoofCleaningToilets, setConditionOfRoofCleaningToilets] =
        useState("");
    const [
        conditionOfWashbasinCleaningToilets,
        setConditionOfWashbasinCleaningToilets,
    ] = useState("");
    const [
        conditionOfBoundaryWallCleaningToilets,
        setConditionOfBoundaryWallCleaningToilets,
    ] = useState("");
    const [
        conditionOfOverheadTankCleaningToilets,
        setConditionOfOverheadTankCleaningToilets,
    ] = useState("");
    const [
        conditionOfElectricBulbCleaningToilets,
        setConditionOfElectricBulbCleaningToilets,
    ] = useState("");
    const [
        conditionOfSepticTankCleaningToilets,
        setConditionOfSepticTankCleaningToilets,
    ] = useState("");
    const [conditionOfPumpCleaningToilets, setConditionOfPumpCleaningToilets] =
        useState("");
    const [
        totalUserChargesCollectedCleaningToilets,
        setTotalUserChargesCollectedCleaningToilets,
    ] = useState("");
    const [
        totalNumberOfHouseholdsInMCCleaningToilets,
        setTotalNumberOfHouseholdsInMCCleaningToilets,
    ] = useState("");
    const [
        userChargesPerUserCleaningToilets,
        setUserChargesPerUserCleaningToilets,
    ] = useState("");
    const [supervisor_id, setSupervisorId] = useState("");
    const [Supervisor, setSupervisor] = useState("");
    const [user_id, setUserId] = useState("");
    const [mohalla, setMohalla] = useState("");
    const [mohallaId, setMohallaId] = useState("");
    const [mohallaName, setMohallaName] = useState([]);
    const [id, setId] = useState("");

    //Loading Header Data States
    const [name, setName] = useState("");
    const [wardId, setWardId] = useState("");
    const [district_name, setDistrictName] = useState("");
    const [block_name, setBLockName] = useState("");

    //loader states
    const [isLoading, setIsLoading] = useState(true);
    const [spinner, setSpinner] = useState(false);

    //Common Other declarations///
    const loadingHeaderData = {
        name: name,
        district_name: district_name,
        ward_id: wardId,
        block_name: block_name,
        supervisor: Supervisor,
    };

    // Getting Community Clean Toilet Survey By Id
    useEffect(() => {
        async function showData() {
            try {
                // Community CLean By id

                const res = await sendRequest(
                    "post",
                    "/cleaningcommunityToilet/id",
                    { token, id },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );


                if (res.status === 1) {
                    console.log("comunity clean id response::", res.data.data.list);

                    //inserting data to the respected fields
                    const api_response = res.data.data.list;

                    setWardId(api_response.ward_id);
                    setMonthAndYearCleaningToilets(api_response.entry_date);
                    setSupervisorId(api_response.supervisor_id);
                    setUserId(api_response.user_id);
                    setCommunityToiletCleaningToilets(api_response.community_toilet_id);
                    setMohallaId(api_response.moholla_committee);
                    setCleaningToiletCleaningToilets(api_response.cleaning_status);
                    setElectricityCleaningToilets(api_response.electricity);
                    setCleaningMaterialsCleaningToilets(api_response.cleaning_materials);
                    setSwiperChargesCleaningToilets(api_response.swiper_charge);
                    setMinorRepairCleaningToilets(api_response.minor_repair);
                    setMajorRepairCleaningToilets(api_response.major_repair);
                    setOMCollectorCleaningToilets(api_response.om_collector);
                    setOMRegisterMaintainedCleaningToilets(api_response.om_register_maintained);
                    setSanitaryWasteManagedCleaningToilets(api_response.sanitary_waste_managed);
                    setHygieneTrainingUndertakenCleaningToilets(api_response.htgentrain_undertaken);
                    setSpecialDayCelebratedCleaningToilets(api_response.special_day_celebrated);
                    setAllTapFunctionalCleaningToilets(api_response.all_tap_functional);
                    setAllDoorsClosingCleaningToilets(api_response.all_doors_close);
                    setConditionOfBoundaryWallCleaningToilets(api_response.condition_of_boundarywall);
                    setConditionOfTilesCleaningToilets(api_response.condition_of_tiles);
                    setConditionOfRoofCleaningToilets(api_response.condition_of_roof);
                    setConditionOfWashbasinCleaningToilets(api_response.condition_of_washbasin);
                    setConditionOfOverheadTankCleaningToilets(api_response.condition_of_overheadtank);
                    setConditionOfElectricBulbCleaningToilets(api_response.condition_of_bulb);
                    setConditionOfSepticTankCleaningToilets(api_response.condition_of_septictank);
                    setConditionOfPumpCleaningToilets(api_response.condition_of_pump);
                    setUserChargesPerUserCleaningToilets(api_response.user_charges_per_user);
                    setTotalUserChargesCollectedCleaningToilets(api_response.total_usercharge_collect);
                    setTotalNumberOfHouseholdsInMCCleaningToilets(api_response.total_house_mc_no);

                    setIsLoading(false);


                }
            } catch (error) {
                console.log("Error at Community Clean by id::", error);
            }
        }
        showData();
    }, [token]);

    const formDataCCUpdate = {
        id: id,
        token: token,
        wardId: wardId,
        // monthYear: monthAndYearCleaningToilets,
        entry_date: monthAndYearCleaningToilets,
        supervisorId: supervisor_id,
        fieldStaff: user_id,
        communityToiletId: communityToiletCleaningToilets,
        mohollaCommittee: mohallaId,
        cleaningStatus: cleaningToiletCleaningToilets,
        electricity: electricityCleaningToilets,
        cleaningMaterials: cleaningMaterialsCleaningToilets,
        swiperCharge: swiperChargesCleaningToilets,
        minorRepair: minorRepairCleaningToilets,
        majorRepair: majorRepairCleaningToilets,
        omCollector: oMCollectorCleaningToilets,
        omRegisterMaintained: oMRegisterMaintainedCleaningToilets,
        sanitaryWasteManaged: sanitaryWasteManagedCleaningToilets,
        htgentrainUndertaken: hygieneTrainingUndertakenCleaningToilets,
        specialDayCelebrated: specialDayCelebratedCleaningToilets,
        allTapFunctional: allTapFunctionalCleaningToilets,
        allDoorsClose: allDoorsClosingCleaningToilets,
        conditionOfTiles: conditionOfTilesCleaningToilets,
        conditionOfRoof: conditionOfRoofCleaningToilets,
        conditionOfWashbasin: conditionOfWashbasinCleaningToilets,
        conditionOfBoundarywall: conditionOfBoundaryWallCleaningToilets,
        conditionOfOverheadtank: conditionOfOverheadTankCleaningToilets,
        conditionOfBulb: conditionOfElectricBulbCleaningToilets,
        conditionOfSeptictank: conditionOfSepticTankCleaningToilets,
        conditionOfPump: conditionOfPumpCleaningToilets,
        totalUserchargeCollect
            : totalUserChargesCollectedCleaningToilets,
        userChargesPerUser: userChargesPerUserCleaningToilets,
        totalHouseMcNo: totalNumberOfHouseholdsInMCCleaningToilets
    };


    const oMOptions = ["select", "yes", "no"];
    const sanitaryOptions = ["select", "yes", "no"];
    const hygineOptions = ["select", "yes", "no"];
    const specialdayOptions = ["select", "yes", "no"];
    const alltapOptions = ["select", "yes", "no"];
    const alldoorOptions = ["select", "yes", "no"];
    const tileconditionOptions = ["select", "good", "poor"];
    const roofconditionOptions = ["select", "good", "poor"];
    const washBasinconditionOptions = ["select", "good", "poor"];
    const boundarywallconditionOptions = ["select", "good", "poor"];
    const overheadtankOptions = ["select", "good", "poor"];
    const bulbOptions = ["select", "good", "poor"];
    const septictankOptions = ["select", "good", "poor"];
    const pumpOptions = ["select", "good", "poor"];

    const dropDownBody = {
        token: token,
        wardId: wardId,
    };


    const route = useRouter();
    const translate = LanguageFetcher();

    // LocalStorage Fetching
    useEffect(() => {
        localStorage.setItem("previousPath", "/home/community-clean-list");
        try {
            async function fetchData() {
                const token = await localStorage.getItem("token");
                if (!token) {
                    route.push("/home/login");
                } else {

                    setToken(token);
                    setId(localStorage.getItem("id"));
                    setUserRole(localStorage.getItem("role_name"));
                    //loadingHeaderData from local storage
                    setName(localStorage.getItem("name"));
                    setDistrictName(localStorage.getItem("district"));
                    setBLockName(localStorage.getItem("block"));
                    setWardId(localStorage.getItem("ward_id"));
                    setSupervisor(localStorage.getItem("supervisor"));
                    setSupervisorId(localStorage.getItem("supervisor_id"));
                    setUserId(localStorage.getItem("user_id"));

                }
            }
            fetchData();
        } catch (error) {
            swal("Error", error.message, "error");
        }
    }, []);

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

                    setMohalla(response.data.data.lists);
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

    // Mohalla Committee List Dropdown State Update --for UPDATE Api
    useEffect(() => {
        if (mohalla.length > 0) {
            const mohallaNames = mohalla.map((mohalla) => mohalla.committee_name);
            setMohallaName(mohallaNames);
            //from ID to Name Update in dropdown
            const mohallaname = mohalla.filter((item) => item.id === mohallaId);
            console.log(mohallaname);
            // setMohallaCommiteeCleaningToilets(mohallaname[0].committee_name);

        }
    }, [mohalla]);


    const handleVal = (id, val) => {
        if (id === "monthAndYearCleaningToilets") {
            setMonthAndYearCleaningToilets(val);
        }
        // if (id === "supervisorCleaningToilets") {
        //   setSupervisorCleaningToilets(val);
        // }
        if (id === "communityToiletCleaningToilets") {
            setCommunityToiletCleaningToilets(val);
        }
        if (id === 'cleaningToiletCleaningToilets') {
            setCleaningToiletCleaningToilets(val);
        }
        if (id === "electricityCleaningToilets") {
            setElectricityCleaningToilets(val);
        }
        if (id === "cleaningMaterialsCleaningToilets") {
            setCleaningMaterialsCleaningToilets(val);
        }
        if (id === "swiperChargesCleaningToilets") {
            setSwiperChargesCleaningToilets(val);
        }
        if (id === "minorRepairCleaningToilets") {
            setMinorRepairCleaningToilets(val);
        }
        if (id === "majorRepairCleaningToilets") {
            setMajorRepairCleaningToilets(val);
        }
        if (id === "mohallaCommiteeCleaningToilets") {
            let mhVal = mohalla.filter((item) => item.committee_name === val);
            let mohallaId_Selected = mhVal[0].id;
            setMohallaId(mohallaId_Selected);
            setMohallaCommiteeCleaningToilets(val);
        }
        if (id === "oMCollectorCleaningToilets") {
            setOMCollectorCleaningToilets(val);
        }
        if (id === "totalUserChargesCollectedCleaningToilets") {
            setTotalUserChargesCollectedCleaningToilets(val);
        }
        if (id === "totalNumberOfHouseholdsInMCCleaningToilets") {
            setTotalNumberOfHouseholdsInMCCleaningToilets(val);
        }

        if (id === "userChargesPerUserCleaningToilets") {
            setUserChargesPerUserCleaningToilets(val);
        }

        if (id === "hygieneTrainingUndertakenCleaningToilets") {
            setHygieneTrainingUndertakenCleaningToilets(val)
        }

        if (id === "specialDayCelebratedCleaningToilets") {
            setSpecialDayCelebratedCleaningToilets(val)
        }

        // if (id === "fieldStaffCleaningToilets") {
        //   setFieldStaffCleaningToilets(val);
        // }

        if (id === "oMRegisterMaintainedCleaningToilets") {
            setOMRegisterMaintainedCleaningToilets(val);
        }
        if (id === "sanitaryWasteManagedCleaningToilets") {
            setSanitaryWasteManagedCleaningToilets(val);
        }

        if (id === "allTapFunctionalCleaningToilets") {
            setAllTapFunctionalCleaningToilets(val);
        }
        if (id === "allDoorsClosingCleaningToilets") {
            setAllDoorsClosingCleaningToilets(val);
        }
        if (id === "conditionOfTilesCleaningToilets") {
            setConditionOfTilesCleaningToilets(val);
        }
        if (id === "conditionOfRoofCleaningToilets") {
            setConditionOfRoofCleaningToilets(val);
        }
        if (id === "conditionOfWashbasinCleaningToilets") {
            setConditionOfWashbasinCleaningToilets(val);
        }
        if (id === "conditionOfBoundaryWallCleaningToilets") {
            setConditionOfBoundaryWallCleaningToilets(val);
        }
        if (id === "conditionOfOverheadTankCleaningToilets") {
            setConditionOfOverheadTankCleaningToilets(val);

        };
        if (id === "conditionOfElectricBulbCleaningToilets") {
            setConditionOfElectricBulbCleaningToilets(val);
        }

        if (id === "conditionOfSepticTankCleaningToilets") {
            setConditionOfSepticTankCleaningToilets(val);
        }

        if (id === "conditionOfPumpCleaningToilets") {
            setConditionOfPumpCleaningToilets(val);
        }

    }


    const UpdateHandler = async (e) => {
        let flag = false;
        e.preventDefault();
        for (const field in formDataCCUpdate) {
            if (formDataCCUpdate[field] === null || formDataCCUpdate[field] === "") {
                flag = true;
                break;
            }
        }
        if (flag) {
            setSpinner(false);
            swal("Error", "Please fill all the fields", "error");
        } else {
            setSpinner(true);
            console.log("CC Update-form Submitted::", formDataCCUpdate);
            //UPDATE API CALLING
            const res = await sendRequest(
                "post",
                "/cleaningcommunityToilet/update",
                formDataCCUpdate,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (res.status === 1) {
                swal("Success", "Updated Successfully", "success");
                route.push("/home/community-clean-list");
            }
        }
    };



    return (
        !isLoading ?
            <>

                {/* //spinner */}

                {spinner ? <><div className={styles.spinnerContainer}><img src="/svg/loader.svg" alt="loader"></img></div></> : null}

                {/* //content */}
                <Header
                    userRole={userRole}
                    isOffCanvasVisible={false}
                    loadingdata={loadingHeaderData}
                />

                <div className={styles.container}>

                    {/* //breadcrumb */}
                    <div className={styles.breadcrumb}>
                        <Textparser text={"Community Toilet Update"} />
                    </div>

                    {/* //Lists */}
                    <div className={styles.formcontainer}>
                        <Surveyques
                            id={"monthAndYearCleaningToilets"}
                            type={"date"}
                            labelText={translate?.Entry_Date_cleaning_toilets}
                            value={monthAndYearCleaningToilets}
                            required={true}
                            handleVal={(id, val) => handleVal(id, val)}
                        />
                        {/* 
                        <Surveyques
                            id={"supervisorCleaningToilets"}
                            labelText={translate?.Supervisor_cleaning_toilets}
                            value={Supervisor}
                            required={true}
                            disabled={true}
                        // handleVal={(id, val) => handleVal(id, val)}
                        />

                        <Surveyques
                            id={"fieldStaffCleaningToilets"}
                            labelText={translate?.Field_Staff_cleaning_toilets}
                            value={name}
                            disabled={true}
                            required={true}
                        // handleVal={(id, val) => handleVal(id, val)}

                        /> */}

                        <Surveyques
                            id={"communityToiletCleaningToilets"}
                            labelText={translate?.Community_Toilet_cleaning_toilets}
                            value={communityToiletCleaningToilets}
                            required={true}
                            handleVal={(id, val) => handleVal(id, val)}
                        />

                        <SurveyDropdown
                            id={"mohallaCommiteeCleaningToilets"}
                            labelText={translate?.Mohalla_Commitee_cleaning_toilets}
                            value={mohallaCommiteeCleaningToilets}
                            required={true}
                            handleVal={(id, val) => handleVal(id, val)}
                            options={mohallaName}
                        />
                        <Surveyques
                            id={"cleaningToiletCleaningToilets"}
                            labelText={translate?.Cleaning_Toilet_cleaning_toilets}
                            value={cleaningToiletCleaningToilets}
                            required={true}
                            handleVal={(id, val) => handleVal(id, val)}
                        />
                        <Surveyques
                            id={"electricityCleaningToilets"}
                            labelText={translate?.Electricity_cleaning_toilets}
                            value={electricityCleaningToilets}
                            required={true}
                            handleVal={(id, val) => handleVal(id, val)}
                        />
                        <Surveyques
                            id={"cleaningMaterialsCleaningToilets"}
                            labelText={translate?.Cleaning_Materials_cleaning_toilets}
                            value={cleaningMaterialsCleaningToilets}
                            required={true}
                            handleVal={(id, val) => handleVal(id, val)}
                        />
                        <Surveyques
                            id={"swiperChargesCleaningToilets"}
                            labelText={translate?.Swiper_Charges_cleaning_toilets}
                            value={swiperChargesCleaningToilets}
                            required={true}
                            handleVal={(id, val) => handleVal(id, val)}
                        />

                        <Surveyques
                            id={"minorRepairCleaningToilets"}
                            labelText={translate?.Minor_Repair_cleaning_toilets}
                            value={minorRepairCleaningToilets}
                            required={true}
                            handleVal={(id, val) => handleVal(id, val)}
                        />

                        <Surveyques
                            id={"majorRepairCleaningToilets"}
                            labelText={translate?.Major_Repair_cleaning_toilets}
                            value={majorRepairCleaningToilets}
                            required={true}
                            handleVal={(id, val) => handleVal(id, val)}
                        />
                        <Surveyques
                            id={"oMCollectorCleaningToilets"}
                            labelText={translate?.OM_Collector_cleaning_toilets}
                            value={oMCollectorCleaningToilets}
                            required={true}
                            handleVal={(id, val) => handleVal(id, val)}
                        />

                        <SurveyDropdown
                            id={"oMRegisterMaintainedCleaningToilets"}
                            labelText={translate?.OM_Register_Maintained_cleaning_toilets}
                            value={oMRegisterMaintainedCleaningToilets}
                            required={true}
                            handleVal={(id, val) => handleVal(id, val)}
                            options={oMOptions}
                        />

                        <SurveyDropdown
                            id={"sanitaryWasteManagedCleaningToilets"}
                            labelText={translate?.Sanitary_Waste_Managed_cleaning_toilets}
                            value={sanitaryWasteManagedCleaningToilets}
                            required={true}
                            handleVal={(id, val) => handleVal(id, val)}
                            options={sanitaryOptions}
                        />

                        <SurveyDropdown
                            id={"hygieneTrainingUndertakenCleaningToilets"}
                            labelText={translate?.Hygiene_Training_Undertaken_cleaning_toilets}
                            value={hygieneTrainingUndertakenCleaningToilets}
                            required={true}
                            handleVal={(id, val) => handleVal(id, val)}
                            options={hygineOptions}
                        />

                        <SurveyDropdown
                            id={"specialDayCelebratedCleaningToilets"}
                            labelText={translate?.Special_Day_Celebrated_cleaning_toilets}
                            value={specialDayCelebratedCleaningToilets}
                            required={true}
                            handleVal={(id, val) => handleVal(id, val)}
                            options={specialdayOptions}
                        />

                        <SurveyDropdown
                            id={"allTapFunctionalCleaningToilets"}
                            labelText={translate?.All_Tap_Functional_cleaning_toilets}
                            value={allTapFunctionalCleaningToilets}
                            required={true}
                            handleVal={(id, val) => handleVal(id, val)}
                            options={alltapOptions}
                        />

                        <SurveyDropdown
                            id={"allDoorsClosingCleaningToilets"}
                            labelText={translate?.All_Doors_Closing_cleaning_toilets}
                            value={allDoorsClosingCleaningToilets}
                            required={true}
                            handleVal={(id, val) => handleVal(id, val)}
                            options={alldoorOptions}
                        />

                        <SurveyDropdown
                            id={"conditionOfTilesCleaningToilets"}
                            labelText={translate?.Condition_of_Tiles_cleaning_toilets}
                            value={conditionOfTilesCleaningToilets}
                            required={true}
                            handleVal={(id, val) => handleVal(id, val)}
                            options={tileconditionOptions}
                        />

                        <SurveyDropdown
                            id={"conditionOfRoofCleaningToilets"}
                            labelText={translate?.Condition_of_Roof_cleaning_toilets}
                            value={conditionOfRoofCleaningToilets}
                            required={true}
                            handleVal={(id, val) => handleVal(id, val)}
                            options={roofconditionOptions}
                        />

                        <SurveyDropdown
                            id={"conditionOfWashbasinCleaningToilets"}
                            labelText={translate?.Condition_of_Washbasin_cleaning_toilets}
                            value={conditionOfWashbasinCleaningToilets}
                            required={true}
                            handleVal={(id, val) => handleVal(id, val)}
                            options={washBasinconditionOptions}
                        />

                        <SurveyDropdown
                            id={"conditionOfBoundaryWallCleaningToilets"}
                            labelText={translate?.Condition_of_Boundary_Wall_cleaning_toilets}
                            value={conditionOfBoundaryWallCleaningToilets}
                            required={true}
                            handleVal={(id, val) => handleVal(id, val)}
                            options={boundarywallconditionOptions}
                        />

                        <SurveyDropdown
                            id={"conditionOfOverheadTankCleaningToilets"}
                            labelText={translate?.Condition_of_Overhead_Tank_cleaning_toilets}
                            value={conditionOfOverheadTankCleaningToilets}
                            required={true}
                            handleVal={(id, val) => handleVal(id, val)}
                            options={overheadtankOptions}
                        />

                        <SurveyDropdown
                            id={"conditionOfElectricBulbCleaningToilets"}
                            labelText={translate?.Condition_of_Electric_Bulb_cleaning_toilets}
                            value={conditionOfElectricBulbCleaningToilets}
                            required={true}
                            handleVal={(id, val) => handleVal(id, val)}
                            options={bulbOptions}
                        />

                        <SurveyDropdown
                            id={"conditionOfSepticTankCleaningToilets"}
                            labelText={translate?.Condition_of_Septic_Tank_cleaning_toilets}
                            value={conditionOfSepticTankCleaningToilets}
                            required={true}
                            handleVal={(id, val) => handleVal(id, val)}
                            options={septictankOptions}
                        />

                        <SurveyDropdown
                            id={"conditionOfPumpCleaningToilets"}
                            labelText={translate?.Condition_of_Pump_cleaning_toilets}
                            value={conditionOfPumpCleaningToilets}
                            required={true}
                            handleVal={(id, val) => handleVal(id, val)}
                            options={pumpOptions}
                        />

                        <Surveyques
                            id={"totalUserChargesCollectedCleaningToilets"}
                            labelText={translate?.Total_User_Charges_Collected_cleaning_toilets}
                            value={totalUserChargesCollectedCleaningToilets}
                            required={true}
                            handleVal={(id, val) => handleVal(id, val)}
                        />
                        <Surveyques
                            id={"totalNumberOfHouseholdsInMCCleaningToilets"}
                            labelText={
                                translate?.Total_number_of_Households_in_MC_cleaning_toilets
                            }
                            value={totalNumberOfHouseholdsInMCCleaningToilets}
                            required={true}
                            handleVal={(id, val) => handleVal(id, val)}
                        />

                        <Surveyques
                            id={"userChargesPerUserCleaningToilets"}
                            labelText={translate?.User_Charges_Per_User_cleaning_toilets}
                            value={userChargesPerUserCleaningToilets}
                            required={true}
                            handleVal={(id, val) => handleVal(id, val)}
                        />

                        <div className={styles.btnContainer}>
                            <button className={styles.submitbtn} onClick={UpdateHandler}>Update</button>
                        </div>
                    </div>
                </div>
            </>
            :
            <FormSkeletonLoader />
    );
}
