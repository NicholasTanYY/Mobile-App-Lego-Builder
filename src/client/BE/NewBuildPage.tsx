import axios from 'axios';

export const handleSearchBuild = async (legoID, setLegoSet, navigation) => {
  const resp = await axios.get(
    `https://rebrickable.com/api/v3/lego/sets/${legoID}`,
    {
      headers: {
        Authorization: `key 5513bf7824a3a30f9281f898490e97dc`,
      },
    },
  );
  setLegoSet(resp.data); // Set the state with new data
};

export const handleAddBuild = async (selectedLegoSet, navigation) => {
  // Code to add to DB
  navigation.navigate('Existing Build');
};
