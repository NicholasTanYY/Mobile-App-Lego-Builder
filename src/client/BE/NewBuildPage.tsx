import axios from 'axios';

export type LegoSet = {
  last_modified_dt: string;
  name: string;
  num_parts: number;
  set_img_url: string;
  set_num: string;
  set_url: string;
  theme_id: number;
  year: number;
};

export const handleSearchBuild = async (legoID, setLegoSets, navigation) => {
  setLegoSets([]); // Clear the state
  const newLegoSet = await fetchLegoSet(legoID);
  setLegoSets([newLegoSet]); // Set the state with new data
};

export const fetchLegoSet = async legoID => {
  const resp = await axios.get(
    `https://rebrickable.com/api/v3/lego/sets/${legoID}`,
    {
      headers: {
        Authorization: `key 5513bf7824a3a30f9281f898490e97dc`,
      },
    },
  );
  const setDetails = resp.data;
  return setDetails;
};

export const handleAddBuild = async (selectedLegoSet, navigation) => {
  if (!selectedLegoSet) return;
  alert('Confirm your build for Lego set ' + selectedLegoSet.set_num + '?');
  navigation.navigate('Existing Build', { selectedLegoSet });
};
