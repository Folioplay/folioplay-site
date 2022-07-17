import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion/dist/framer-motion";

export default function SplashScreen({ isVisible }) {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div key="modal"
                    className="splash-screen-wrapper">
                    <motion.img
                        initial={{ y: "100vh" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.5 }}
                        exit={{ y: "100vh" }}
                        className="mb-20"
                        alt="folioplay-logo"
                        src={require("../../../images/folioplayLogo.png").default}
                    />
                    <motion.img initial={{ y: "200vh" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.5 }} exit={{ y: "200vh" }} src={require('../../../images/white_folioplay.svg').default} />
                    <motion.img
                        className="animated-coins" src={require("../../../images/coinLogos/btc.png").default} width={"120px"} height={"120px"} />
                </motion.div>
            )}
        </AnimatePresence>
    );
}