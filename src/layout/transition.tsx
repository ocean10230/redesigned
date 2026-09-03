import { motion } from "framer-motion";

const Transition = ({ OgComponent }: { OgComponent: React.ReactNode }) => {
    return <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease:[0,0,0,1] }}
    >
        {OgComponent}
    </motion.div>
}

export default Transition