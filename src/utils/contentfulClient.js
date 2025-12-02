import { createClient } from 'contentful';

const client = createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
});

export const fetchProjects = async () => {
 
  const res = await client.getEntries({
    content_type: 'projects'
  });

  return res.items;
};
