'use client';
import styles from '@/app/home/(routes)/(with-routes-layout)/waste-collection-add/waste.module.css';
import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';



export default function FormSkeletonLoader() {

    // const [userRole, setUserRole] = useState("");

    // useEffect(() => {
    //     setUserRole(localStorage.getItem("userRole"));
    // }, [])
    return (
        <>

            <Skeleton width={"100%"} height={100} baseColor="#6b96db" borderRadius={0} />

            <div className={styles.container}>
                <div className={styles.breadcrumb}>

                    <Skeleton width={200} baseColor="#6fd199" />

                </div>

                <div className={styles.ListContainerWasteCollection}>
                    <div className={styles.textParser}>

                        <Skeleton width={200} baseColor="#f2d98d" />


                    </div>

                    <div>
                        {[...Array(7)].map((_, index) => (
                            <div className={styles.formcontainer} key={index}>
                                <Skeleton width={200} height={10} />
                                <Skeleton width={"100%"} height={40} />
                            </div>
                        ))}
                    </div>


                </div>
            </div>
        </>
    )
}
