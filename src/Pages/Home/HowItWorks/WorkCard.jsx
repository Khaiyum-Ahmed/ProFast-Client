

const WorkCard = ({ item}) => {
    const {icon: Icon, title, description} = item
    return (
        <div className="flex flex-col bg-white rounded-2xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300">
            <div className="text-[#03373D] text-4xl mb-4">
                <Icon />
            </div>
            <h3 className="font-bold text-xl text-[#03373D] mb-2">{title}</h3>
            <p className="text-base font-medium text-[#606060]">{description}</p>
        </div>
    );
};

export default WorkCard;
