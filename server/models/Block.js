import {capacityTable} from './Transport';

export default class Block {
  constructor(city) {
    this.city = city;
  }

  parseCity() {
    this.blocks = new Array(100).fill(null).map((el, key) => {
      return {
        routes: [],
        key,
        sides: [
          {
            xStart: key % 10,
            yStart: Math.floor(key / 10),
            xEnd: (key % 10),
            yEnd: Math.floor(key / 10) + 1,
          },
          {
            xStart: key % 10,
            yStart: Math.floor(key / 10) + 1,
            xEnd: (key % 10) + 1,
            yEnd: Math.floor(key / 10) + 1,
          },
          {
            xStart: key % 10 + 1,
            yStart: Math.floor(key / 10),
            xEnd: (key % 10) + 1,
            yEnd: Math.floor(key / 10) + 1,
          },
          {
            xStart: key % 10,
            yStart: Math.floor(key / 10),
            xEnd: (key % 10) + 1,
            yEnd: Math.floor(key / 10),
          },
        ],
        xLeft: key % 10,
        isSide: (key % 10) === 0 || Math.floor(key / 10) === 0,
        isCorner: (key % 10) === 0 && Math.floor(key / 10) === 0,
        yLeft: Math.floor(key / 10),
        people: this.city.population / 100,
        color: 1
      };
    });
    this.city.routes.forEach((el) => {
      console.log(el);
      el.points.forEach((point) => {
        this.blocks.filter((block) => {
          return (block.xLeft === point.x || block.xLeft === point.x + 1) && (block.yLeft === point.y || block.yLeft === point.y + 1)
        }).forEach((block) => {
          block.routes.push(el);
        });
      });
    });

    this.blocks.forEach((block) => {
      block.routes.forEach((route) => {
        block.sides.forEach((side) => {
          const mappedRoute = mapRouteToBlocks(route);
          if (mappedRoute.includes(`(${side.xStart},${side.yStart}),(${side.xEnd},${side.yEnd})`) ||
            mappedRoute.includes(`(${side.xStart},${side.yEnd}),(${side.xEnd},${side.yStart})`) ||
            mappedRoute.includes(`(${side.xEnd},${side.yStart}),(${side.xStart},${side.yEnd})`)) {
            if (side.route && Array.isArray(side.route.route)) {
              side.route.vehicles.push(route.transport.type)
            } else {
              side.route = {
                color: 1,
                vehicles: [route.transport.type],
              };
            }
          }
        });
      });
    });

    this.blocks.forEach((block) => {
      block.sides.forEach((side) => {
        if (side.route && side.route.vehicles) {
          side.route.color = mapRouteCountToRouteColor(side.route);
        }
      });
      block.color = mapBlockToColor(block);
    });

    return this.blocks.map((el) => {
      return {...el, routes: undefined};
    });
  }

}

function mapRouteToBlocks(route) {
  return route.points.map((el) => {
    return {
      x: el.x,
      y: el.y,
    };
  }).reduce((a, b) => {
    return `${a},(${b.x},${b.y})`;
  }, '');
}

function mapRouteCountToRouteColor(route) {
  if (route.vehicles.length < 2) {
    return 1;
  } else if (route.vehicles.length > 2) {
    return 3;
  }
  return 2;
}

function mapBlockToColor(block) {
  const sideSum = block.sides.map((el) => {
    if (el.route && el.route.vehicles) {
      return el.route.vehicles.map((v) => {
        return capacityTable[v];
      }).reduce((a, b) => {
        return a + b;
      });
    }
    return 0;
  }).reduce((a, b) => {
    return a + b;
  });
  if (sideSum === 0) {
    return 3;
  }
  if (block.isCorner) {
    if (sideSum > block.people) {
      return 1;
    }
    if (sideSum > block.people / 2) {
      return 2;
    }
    return 3;
  }
  if (block.isSide) {
    if (sideSum * 0.75 > block.people) {
      return 1;
    }
    if (sideSum * 0.75 > block.people / 2) {
      return 2;
    }
    return 3;
  }

  if (sideSum / 2 > block.people) {
    return 1;
  }
  if (sideSum / 2 > block.people / 2) {
    return 2;
  }
  return 3;
}