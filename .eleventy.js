const cssnano = require("cssnano");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const dateFns = require("date-fns");
const nlLocale = require("date-fns/locale/nl");
const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy({ "./src/assets": "assets" });

  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addNunjucksAsyncFilter("postcss", (cssCode, done) => {
    cssnano({ preset: "default" })
      .process(cssCode)
      .then(
        (r) => done(null, r.css),
        (e) => done(e, null)
      );
  });

  eleventyConfig.addCollection("posts", (collectionApi) => {
    return collectionApi.getFilteredByGlob("./src/blog/*.md");
  });

  eleventyConfig.addNunjucksFilter("formatDateNl", (date) => {
    return dateFns.format(date, "d MMMM yyyy", { locale: nlLocale });
  });

  module.exports = function(eleventyConfig) {
    eleventyConfig.addNunjucksFilter("dateToRfc3339", pluginRss.dateToRfc3339);
  };

  return {
    markdownTemplateEngine: "njk",
    dir: {
      includes: "includes",
      input: "src",
      layouts: "layouts",
      output: "dist",
    },
  };
};
