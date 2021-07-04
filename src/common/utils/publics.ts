// 执行注册store钩子
export const registerModules = (
  components: Component[],
  router: Router,
) => {
  return components
    .filter((i: any) => typeof i.registerModule === "function")
    .forEach((component: any) => {
      component.registerModule({router: router.currentRoute});
    });
};

// 调用当前匹配到的组件里asyncData钩子，预取数据
export const prefetchData = (
  components: Component[],
  router: Router,
) => {
  console.log(1)
  components.forEach((item: Component) => {
    console.log(2, item)
  })
  const asyncData: any[] = components.filter(
    (i: any) => typeof i.asyncData === "function"
  );
  return Promise.all(
    asyncData.map((i) => {
      console.log(i)
      return i.asyncData({router: router.currentRoute.value});
    })
  );
};

// ssr自定义钩子
export const getAsyncData = (
  router: Router,
  isServer: boolean
): Promise<void> => {
  return new Promise(async (resolve) => {
    const {matched, fullPath} = router.currentRoute.value;

    // 当前路由匹配到的组件
    const components: Component[] = matched.map((i) => i.components.default);
    // 动态注册store
    // registerModules(components, router);

    if (isServer) {
      // 预取数据
      await prefetchData(components, router);
      // !isServer && store.$setSsrPath("");
    }

    resolve();
  });
};
