import { ProfileUser } from "./ProfileUser";

export function WrittenByIcons({ profileUrl, peopleNum }) {
  const urls = profileUrl || [];

  return (
    <>
      {urls.map((userUrl, index) => {
        const last = index === urls.length - 1;

        return (
          <ProfileUser
            key={userUrl}
            src={userUrl}
            peopleNum={last ? `+${peopleNum - 3}` : null}
            last={last}
          />
        );
      })}
    </>
  );
}
