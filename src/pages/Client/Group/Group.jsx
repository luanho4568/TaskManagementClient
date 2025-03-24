import GroupList from "./GroupList";

const Group = ({setIsInGroup}) => {
  return (
    <div className="w-full pt-20 sub-bg h-screen flex flex-col items-center">
      <GroupList setIsInGroup={setIsInGroup}/>
    </div>
  );
};

export default Group;
