<template>
  <div>
    <v-img :src="imgUrl" width="128" height="128"></v-img>
    <br />
    <h1>Welcome to Tracking Detector</h1>
    <br />
    <p class="text-subtitle-1 blocksatz">
      The extension provides a comprehensive solution for protecting the privacy
      of internet users by blocking third-party tracking requests. This feature
      is accomplished through the implementation of advanced algorithms and
      machine learning models, which are designed to more or less accurately
      identify and block such requests. The extension also enables users to
      manually label requests as either tracking or non-tracking, and to
      contribute their labeled data sets to the central database for further
      analysis and refinement of the models. Furthermore, the extension provides
      a visual representation of the various types of trackers, and the reasons
      why they are considered harmful to user privacy. This information is
      presented in the form of diagrams and explanations, which help users to
      understand the technical details behind the extension and its workings.
      Additionally, the extension includes diagrams that demonstrate the inner
      workings of the extension and the training process of the machine learning
      models, further educating users on the technical aspects of the solution.
    </p>
    <h1>What are web-trackers?</h1>
    <br />
    <p class="text-subtitle-1 blocksatz">
      Web trackers are a prevalent feature of the modern internet landscape and
      refer to any mechanism that allows websites and advertisers to collect
      data on the browsing habits of internet users. There are several types of
      tracking methods that web trackers can employ, including cookies, device
      fingerprinting, browser fingerprinting, and browser extensions. These
      methods enable advertisers and website owners to create detailed profiles
      of users, which can then be used for targeted advertising and other
      purposes.
      <br />
      <br />
      Cookies are one of the most commonly used tracking methods, and they are
      small text files stored on a user's device. They are used to store
      information about the websites that a user visits, including login
      credentials and preferences. The problem with cookies is that they can be
      used to create a detailed profile of a user, which can then be sold to
      advertisers. Device fingerprinting is another tracking method that is used
      to identify a user's device. This technique involves collecting
      information about a user's device, including its hardware and software
      specifications, and using this information to create a unique identifier.
      This identifier can then be used to track a user's online activities, even
      if they delete their cookies or use incognito mode. Browser fingerprinting
      is a similar technique that involves collecting information about a user's
      browser, including its type, version, and installed plugins. This
      information is then used to create a unique identifier that can be used to
      track a user's online activities.
      <br />
      <br />
      Browser extensions, on the other hand, are add-ons that can be installed
      in a browser to block web trackers. They work by identifying and blocking
      requests from known tracking domains, and they can also be configured to
      block requests from specific websites. There are several reasons why one
      should block web trackers. Firstly, web trackers can be used to collect
      sensitive information about a user's online activities, including their
      browsing history and login credentials. This information can then be used
      for malicious purposes, such as identity theft or targeted advertising.
      Secondly, web trackers can slow down a user's browsing experience, as they
      often make multiple requests to tracking domains, which can consume
      bandwidth and slow down the loading of websites. Finally, web trackers can
      be a privacy concern, as they enable advertisers and website owners to
      create detailed profiles of users, which can be used for targeted
      advertising and other purposes. By blocking web trackers, users can
      protect their privacy and ensure that their online activities are not
      being monitored.
      <br />
      <br />
      In conclusion, web trackers are a ubiquitous feature of the modern
      internet landscape, and there are several types of tracking methods that
      they can employ. By blocking web trackers, users can protect their
      privacy, ensure that their online activities are not being monitored, and
      improve their browsing experience.
    </p>
    <h1>How does our system work?</h1>
    <br />
    <p class="text-subtitle-1 blocksatz">
      Web trackers are a prevalent feature of the modern internet landscape and
      refer to any mechanism that allows websites and advertisers to collect
      data on the browsing habits of internet users. There are several types of
      tracking methods that web trackers can employ, including cookies, device
      fingerprinting, browser fingerprinting, and browser extensions. These
      methods enable advertisers and website owners to create detailed profiles
      of users, which can then be used for targeted advertising and other
      purposes.
      <br />
      <br />
      Cookies are one of the most commonly used tracking methods, and they are
      small text files stored on a user's device. They are used to store
      information about the websites that a user visits, including login
      credentials and preferences. The problem with cookies is that they can be
      used to create a detailed profile of a user, which can then be sold to
      advertisers.
      <br />
      <br />
      Device fingerprinting is another tracking method that is used to identify
      a user's device. This technique involves collecting information about a
      user's device, including its hardware and software specifications, and
      using this information to create a unique identifier. This identifier can
      then be used to track a user's online activities, even if they delete
      their cookies or use incognito mode.
      <br />
      <br />
      Browser fingerprinting is a similar technique that involves collecting
      information about a user's browser, including its type, version, and
      installed plugins. This information is then used to create a unique
      identifier that can be used to track a user's online activities.
      <br />
      <br />
      Browser extensions, on the other hand, are add-ons that can be installed
      in a browser to block web trackers. They work by identifying and blocking
      requests from known tracking domains, and they can also be configured to
      block requests from specific websites.
      <br />
      <br />
      There are several reasons why one should block web trackers. Firstly, web
      trackers can be used to collect sensitive information about a user's
      online activities, including their browsing history and login credentials.
      This information can then be used for malicious purposes, such as identity
      theft or targeted advertising.
      <br />
      <br />
      Secondly, web trackers can slow down a user's browsing experience, as they
      often make multiple requests to tracking domains, which can consume
      bandwidth and slow down the loading of websites.
      <br />
      <br />
      Finally, web trackers can be a privacy concern, as they enable advertisers
      and website owners to create detailed profiles of users, which can be used
      for targeted advertising and other purposes. By blocking web trackers,
      users can protect their privacy and ensure that their online activities
      are not being monitored.
      <br />
      <br />
      In conclusion, web trackers are a ubiquitous feature of the modern
      internet landscape, and there are several types of tracking methods that
      they can employ. By blocking web trackers, users can protect their
      privacy, ensure that their online activities are not being monitored, and
      improve their browsing experience.
    </p>
  </div>
</template>
<script>
export default {
  computed: {
    imgUrl: function() {
      return browser.runtime.getURL('icons/icon128.png');
    }
  }
}
</script>
<style>
.blocksatz {
  text-align: justify;
}
</style>
