import { ReactElement, useEffect } from 'react';
import Layout from '../../../layouts';

import axiosInstance from '../../../utils/axios-instance';
import { useCrudSliceStore } from '../../../redux/features/crud/crudSlice';
import SpaceHomeSection from '../../../sections/dashboard_pages/space_home_section/SpaceHomeSection';

import { MaintainerModel } from '../../../types/models/maintainer-model';
import { MaintenanceModel } from '../../../types/models/maintenance-model';
import { SpaceModel } from '../../../types/models/space-model';
import { ThreadModel } from '../../../types/models/thread-model';
import { useRouter } from 'next/router';
import { showNotification } from '@mantine/notifications';
import { _PATH_API } from '../../../path/path-api';

interface Props {
  space: SpaceModel;
  maintainers: MaintainerModel[];
  maintenances: MaintenanceModel[];
  threads: ThreadModel[];
}

export default function HomePageSlug({ space, maintainers, maintenances, threads }: Props) {
  // const {query}: {query: ParsedQueryCustom} = useRouter()
  // const spaceId = query.slug
  const { setCrudDocument, setCrudDocuments } = useCrudSliceStore();

  useEffect(() => {
    handleFetchHomeData();
  }, [space?._id]);

  const handleFetchHomeData = async () => {
    const homeData = await fetchSpaceData();
    const { space, maintainers, maintenances, threads } = homeData;
    setCrudDocument({ entity: 'spaces', document: space });
    setCrudDocuments({ entity: 'maintainers', documents: maintainers });
    setCrudDocuments({ entity: 'maintenances', documents: maintenances });
    setCrudDocuments({ entity: 'threads', documents: threads });
  };

  const fetchSpaceData = async () => {
    try {
      const res = await axiosInstance.get(_PATH_API.spaces.home);
      return res.data.data;
    } catch (error) {
      showNotification({
        title: 'Error',
        message: 'Error fetching space data',
        color: 'red',
      });
    }
  };

  return <SpaceHomeSection />;
}

HomePageSlug.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="dashboard">{page}</Layout>;
};

// export async function getStaticPaths() {
//   // Generate paths for buildings
//   const mainSpaces = await axiosInstance.get(
//     `${process.env.NEXT_PUBLIC_API_URL}/space-auth/ssg-paths?ssg_secret=${process.env.NEXT_PUBLIC_SSG_SECRET}`
//   );
//   const paths = mainSpaces.data.data.map((space: SpaceModel) => ({ params: { slug: space } }));
//   return {
//     paths,
//     fallback: 'blocking', // false or "blocking"
//   };
// }

// export async function getStaticProps({ params }: { params: { slug: string } }) {
//   try {
//     const slug = params.slug;
//     const res = await axiosInstance.get(
//       `${process.env.NEXT_PUBLIC_API_URL}/space-auth/static-props/${slug}`,
//       {
//         params: { ssg_secret: process.env.NEXT_PUBLIC_SSG_SECRET },
//       }
//     );
//     const data = res.data.data;
//     // const data = ~await res.json();

//     // const data = await res.json();
//     const { space, maintainers, maintenances, threads } = data || [];
//     return {
//       props: {
//         space,
//         maintainers,
//         maintenances,
//         threads,
//       },
//     };
//   } catch (error) {
//     return {
//       redirect: {
//         destination: '/error',
//       },
//     };
//   }
// }
