import { Profile } from './profile.entity';

const someScreenName = 'Screen.Name_Example';
const someBaseScreenName = 'screennameexample';

describe('Profile', () => {
  describe('castToIndexedScreenName', () => {
    it('should return base screen name', () => {
      expect(Profile.castToIndexedScreenName(someScreenName)).toEqual(someBaseScreenName);
    });
  });

  describe('updateIndexedScreenName', () => {
    it('should update base screen name', () => {
      const someProfile = new Profile();
      someProfile.screenName = someScreenName;

      someProfile.updateIndexedScreenName();

      expect(someProfile.indexedScreenName).toEqual(someBaseScreenName);
    });
  });
});
