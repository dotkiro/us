import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Wrap = styled.div({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  height: 0,
  // bottom: 0,
  // overflow: 'hidden',
  userSelect: 'none',
})

type MenuListProps = {
  visible: boolean
}

const Mask = styled.div<MenuListProps>(({ visible }) => ({
  position: 'fixed',
  zIndex: 10,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0,0,0,0.5)',
  transition: '300ms opacity',
  opacity: +visible,
  transform: `translate3d(0,${visible ? 0 : '-100%'},0)`,
  filter: 'blur(30px)',
}))

const Menus = styled.div<MenuListProps>(({ visible }) => ({
  position: 'absolute',
  zIndex: 20,
  left: 0,
  bottom: '100%',
  right: 0,
  transition: '300ms',
  transform: `translate3d(0,${visible ? '100%' : 0},0)`,
  boxSizing: 'border-box',
  padding: '12px 0',
  background: '#fff',
}))

const Menu = styled(Link)({
  display: 'block',
  fontSize: 16,
  lineHeight: 1.25,
  padding: '10px 15px',
  borderBottom: '1px solid #eee'
})

const MIN_PULL_LENGTH = 0
const MAX_PULL_LENGTH = 40
const pullLengthAverage = (MIN_PULL_LENGTH + MAX_PULL_LENGTH) / 2
const PullingRope = styled.svg.attrs({
  viewBox: '0 0 200 800',
  version: '1.1',
  xmlns: 'http://www.w3.org/2000/svg',
})<{ moveY: number }>(({ moveY }) => ({
  position: 'absolute',
  zIndex: 30,
  top: -MAX_PULL_LENGTH,
  right: 20,
  width: 30,
  transition: `${moveY ? 0 : 3e2}ms all`,
  transform: `translate3d(0,${moveY}px,0)`,
  pointerEvents: 'none',
  path: {
    pointerEvents: 'all'
  }
}))

const PullingRopePath = styled.path.attrs({
  className: 'no-tap-highlight',
  fill: '#002C5B',
  d: 'M96.9980249,557.286283 L67.0443428,529.377732 C65.3682343,527.816062 65.3682343,525.246864 67.0443428,523.685194 L96.9980249,495.776643 C98.6741336,494.214973 101.431602,494.214973 103.107711,495.776643 L133.061393,523.685194 C134.737502,525.246864 134.737502,527.816062 133.061393,529.377732 L103.107711,557.286283 C101.377534,558.847953 98.6741336,558.847953 96.9980249,557.286283 L96.9980249,557.286283 Z M176.207672,504.189509 C170.692734,504.189509 165.34,505.952685 161.122695,509.176777 C159.987266,510.033176 158.905906,511.040707 157.932682,512.09861 L150.309091,519.20169 L133.007325,503.081228 L146.470262,490.537494 C155.553689,482.07425 155.553689,468.321481 146.470262,459.858238 C142.090752,455.777744 136.251406,453.510806 130.033584,453.510806 C123.815762,453.510806 117.976416,455.777744 113.596907,459.858238 L100.025834,472.452349 L86.5628974,459.908613 C82.183388,455.828121 76.344042,453.561181 70.1262198,453.561181 C63.9083978,453.561181 58.0690516,455.828121 53.6895421,459.908613 C44.6061152,468.371856 44.6061152,482.124625 53.6895421,490.587868 L67.0984108,503.081228 L49.7425769,519.20169 L41.47017,511.494094 C40.92949,510.99033 40.3888097,510.436189 39.8481295,509.982801 C35.46862,506.30532 29.791478,504.290263 23.8980641,504.290263 C10.7054676,504.290263 0,514.264799 0,526.55665 C0,538.848504 10.7054676,548.82304 23.8980641,548.82304 C29.250798,548.82304 34.2791235,547.210993 38.496429,544.188407 C39.9562655,543.130502 41.307966,541.921467 42.4433945,540.561303 L49.7425769,533.760484 L67.0443428,549.880946 L53.6354741,562.374303 C49.2559647,566.454797 46.8229039,571.895452 46.8229039,577.688745 C46.8229039,583.482035 49.2559647,588.922691 53.6354741,593.053559 C58.0149836,597.134053 63.8543296,599.400991 70.0721518,599.400991 C76.289974,599.400991 82.12932,597.134053 86.5088294,593.053559 L99.9717658,580.509824 L113.434703,593.053559 C117.814212,597.134053 123.653558,599.400991 129.87138,599.400991 C136.089202,599.400991 141.928548,597.134053 146.308058,593.053559 C155.391485,584.590316 155.391485,570.837546 146.308058,562.374303 L132.845121,549.830569 L150.146887,533.710107 L158.419294,541.417703 L158.581498,541.568832 L159.825062,542.727492 C159.933198,542.828243 160.041334,542.928995 160.14947,542.979372 C164.52898,546.656854 170.206122,548.671911 176.099536,548.671911 C189.292132,548.671911 199.999212,538.697375 199.999212,526.405521 C200.105736,514.164045 189.400268,504.189509 176.207672,504.189509 Z M100.025834,533.760484 L117.3276,549.880946 L100.025834,566.051785 L82.7240682,549.931323 L100.025834,533.760484 Z M100.025834,519.252067 L82.7240682,503.131603 L100.025834,487.011141 L117.3276,503.131603 L100.025834,519.252067 Z M121.220497,467.162821 C123.545422,464.996635 126.573231,463.837977 129.87138,463.837977 C133.169529,463.837977 136.251406,464.996635 138.522263,467.162821 C143.280249,471.59595 143.280249,478.850156 138.522263,483.283285 L125.059326,495.82702 L107.757561,479.706556 L121.220497,467.162821 Z M61.4212688,483.33366 C56.6632831,478.900533 56.6632831,471.646325 61.4212688,467.213198 C63.7461936,465.047012 66.7740026,463.888352 70.0721518,463.888352 C73.370301,463.888352 76.452178,465.047012 78.7230347,467.213198 L92.1859714,479.756933 L74.8842055,495.877397 L61.4212688,483.33366 L61.4212688,483.33366 Z M10.9758077,526.607027 C10.9758077,520.007712 16.7610857,514.617434 23.8439961,514.617434 C26.9799411,514.617434 30.0077503,515.67534 32.332675,517.589643 L41.9567822,526.55665 L31.4675868,536.329683 C29.250798,537.840975 26.6014651,538.646998 23.8439961,538.646998 C16.7610857,538.596623 10.9758077,533.206343 10.9758077,526.607027 Z M57.5283716,526.506276 L74.8842055,510.385811 L92.1859714,526.506276 L74.8301375,542.677114 L57.5283716,526.506276 Z M78.7771027,585.849728 C76.452178,588.015916 73.370301,589.174574 70.1262198,589.174574 C66.8280708,589.174574 63.7461936,588.015916 61.4753368,585.849728 C59.1504121,583.683542 57.9068476,580.86246 57.9068476,577.789497 C57.9068476,574.716534 59.1504121,571.845075 61.4753368,569.729266 L74.8842055,557.235906 L92.1859714,573.35637 L78.7771027,585.849728 L78.7771027,585.849728 Z M138.576331,569.729266 C143.334317,574.162393 143.334317,581.416601 138.576331,585.849728 C136.251406,588.015916 133.223597,589.174574 129.925448,589.174574 C126.627299,589.174574 123.545422,588.015916 121.274565,585.849728 L107.811629,573.305993 L125.113394,557.135154 L138.576331,569.729266 L138.576331,569.729266 Z M107.811629,526.506276 L125.113394,510.385811 L142.41516,526.506276 L125.113394,542.626737 L107.811629,526.506276 Z M176.207672,538.495869 C173.017659,538.495869 169.98985,537.387588 167.610857,535.422906 L166.583565,534.465752 L166.42136,534.314623 L158.040818,526.506276 L165.826612,519.252067 L168.259673,516.985127 C170.53053,515.322705 173.287999,514.415928 176.207672,514.415928 C183.290582,514.415928 189.07586,519.806208 189.07586,526.405521 C189.07586,533.105588 183.290582,538.495869 176.207672,538.495869 L176.207672,538.495869 Z M99.2655025,462.833596 C103.356384,462.833596 106.716751,445.909632 106.716751,425.306548 L106.716751,37.5270483 C106.716751,16.923963 103.356384,0 99.2655025,0 C95.1746208,0 91.8142537,16.923963 91.8142537,37.5270483 L91.8142537,425.306548 C91.8142537,445.909632 95.1746208,462.833596 99.2655025,462.833596 L99.2655025,462.833596 Z M105.432636,600.861909 L105.432636,594.564854 C105.432636,591.743772 102.945507,589.426455 99.9176978,589.426455 C96.8898889,589.426455 94.4027601,591.743772 94.4027601,594.564854 L94.4027601,600.861909 C94.4027601,603.682991 96.8898889,606.000306 99.9176978,606.000306 C102.945507,606.000306 105.432636,603.682991 105.432636,600.861909 Z M85.2652649,614.513926 C85.2652649,617.335006 87.7523939,619.652324 90.7802029,619.652324 L109.055193,619.652324 C112.083002,619.652324 114.570131,617.335006 114.570131,614.513926 C114.570131,611.692845 112.083002,609.375529 109.055193,609.375529 L90.7802029,609.375529 C87.6983257,609.425904 85.2652649,611.692845 85.2652649,614.513926 Z M113.813179,620.508723 L85.9681492,620.508723 C82.9403402,620.508723 80.4532112,622.826038 80.4532112,625.64712 C80.4532112,628.468202 82.9403402,630.785517 85.9681492,630.785517 L113.867247,630.785517 C116.895056,630.785517 119.382184,628.468202 119.382184,625.64712 C119.382184,622.826038 116.895056,620.508723 113.813179,620.508723 L113.813179,620.508723 Z M86.7251014,633.354716 C83.6972925,633.354716 81.2101635,635.672033 81.2101635,638.493113 L81.2101635,794.861601 C81.2101635,797.682682 83.6972925,800 86.7251014,800 C89.7529104,800 92.2400394,797.682682 92.2400394,794.861601 L92.2400394,638.493113 C92.2400394,635.672033 89.7529104,633.354716 86.7251014,633.354716 L86.7251014,633.354716 Z M100.188038,633.354716 C97.1602291,633.354716 94.6731001,635.672033 94.6731001,638.493113 L94.6731001,794.861601 C94.6731001,797.682682 97.1602291,800 100.188038,800 C103.215847,800 105.702976,797.682682 105.702976,794.861601 L105.702976,638.493113 C105.702976,635.672033 103.269915,633.354716 100.188038,633.354716 L100.188038,633.354716 Z M113.056227,633.354716 C110.028417,633.354716 107.541289,635.672033 107.541289,638.493113 L107.541289,794.861601 C107.541289,797.682682 110.028417,800 113.056227,800 C116.084035,800 118.571164,797.682682 118.571164,794.861601 L118.571164,638.493113 C118.571164,635.672033 116.138103,633.354716 113.056227,633.354716 L113.056227,633.354716 Z'
})({
  cursor: 'grabbing',
})

const PullingRopePath2 = styled.path.attrs({
  className: 'no-tap-highlight',
  fill: 'rgba(0,0,0,0)',
  d: 'M91.0848122,629.147929 L3.66863888,537.360947 C-1.22287963,532.224852 -1.22287963,523.775148 3.66863888,518.639053 L91.0848122,426.852071 C95.9763314,421.715976 104.023668,421.715976 108.915187,426.852071 L196.331361,518.639053 C201.22288,523.775148 201.22288,532.224852 196.331361,537.360947 L108.915187,629.147929 C103.865877,634.284024 95.9763314,634.284024 91.0848122,629.147929 L91.0848122,629.147929 Z'
})({
  cursor: 'grabbing',
})

type MenuItem = {
  name: string
  path: string
}
type NavigationProps = {
  menus: MenuItem[]
}
type NavigationState = {
  pullingStartY: number;
  pullingMoveY: number;
  isNavsVisible: boolean;
}
class Navigation extends PureComponent<NavigationProps, NavigationState> {
  constructor (props: NavigationProps) {
    super(props)

    this.state = {
      pullingStartY: 0,
      pullingMoveY: 0,
      isNavsVisible: false,
    }

    this.onTapPullingRope = this.onTapPullingRope.bind(this)
    this.onPullStart = this.onPullStart.bind(this)
    this.onPulling = this.onPulling.bind(this)
    this.onPullEnd = this.onPullEnd.bind(this)
    this.removeEvents = this.removeEvents.bind(this)
  }

  componentWillUnmount () {
    this.removeEvents()
  }

  onTapPullingRope () {
    console.log(44)
    const { isNavsVisible } = this.state

    this.setState({
      isNavsVisible: !isNavsVisible
    })
  }

  onPullStart (event: React.TouchEvent | React.MouseEvent) {
    const { onPulling, onPullEnd } = this
    if (event.type === 'touchstart') {
      this.setState({
        pullingStartY: ~~((event as React.TouchEvent).touches[0].screenY)
      })
      window.addEventListener('touchmove', onPulling, { passive: false })
      window.addEventListener('touchend', onPullEnd)
    } else {
      this.setState({
        pullingStartY: ~~(event as React.MouseEvent).clientY
      })
      window.addEventListener('mousemove', onPulling, { passive: false })
      window.addEventListener('mouseup', onPullEnd)
    }
  }

  onPulling (event) {
    event.preventDefault()
    const { pullingStartY } = this.state
    const moveY = ~~(event instanceof MouseEvent ? event.clientY : event.touches[0].screenY) - pullingStartY
    this.setState({
      pullingMoveY: Math.min(Math.max(MIN_PULL_LENGTH, moveY), MAX_PULL_LENGTH),
    })
  }

  removeEvents () {
    const { onPulling, onPullEnd } = this
    window.removeEventListener('touchmove', onPulling)
    window.removeEventListener('touchup', onPullEnd)
    window.removeEventListener('mousemove', onPulling)
    window.removeEventListener('mouseup', onPullEnd)
  }

  onPullEnd () {
    const { state, removeEvents } = this
    const { isNavsVisible, pullingMoveY } = state

    removeEvents()
    this.setState({
      pullingMoveY: 0,
      isNavsVisible: pullingMoveY > pullLengthAverage ? !isNavsVisible : isNavsVisible
    })
  }

  render () {
    const { state, onPullStart, props, onTapPullingRope } = this
    const { menus } = props
    const { pullingMoveY, isNavsVisible } = state

    const pullingRopePathProps = {
      onMouseDown: onPullStart,
      onTouchStart: onPullStart,
      onClick: onTapPullingRope
    }

    return (
      <Wrap>
        <Mask visible={isNavsVisible} onClick={onTapPullingRope} />
        <Menus visible={isNavsVisible}>
          {
            menus.map(({ path, name }) => (
              <Menu to={path} key={path} onClick={onTapPullingRope}>
               {name}
              </Menu>
            ))
          }
        </Menus>

        <PullingRope moveY={pullingMoveY}>
          <PullingRopePath {...pullingRopePathProps} />
          <PullingRopePath2 {...pullingRopePathProps} />
        </PullingRope>
      </Wrap>
    )
  }
}

export default Navigation
