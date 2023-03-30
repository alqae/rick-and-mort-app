import { StyleSheet, View } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop, SvgProps } from 'react-native-svg';

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '20%',
    position: 'relative',
  },
});

export const Panel: React.FC<SvgProps & { width: number; height: number; }> = ({ height, width, children, style }) => (
  <View style={[styles.card, { width, height }, style]}>
    {children}

    <Svg
      fill="none"
      viewBox={`0 0 ${width} ${height}`}
      style={{ position: 'absolute', zIndex: -1 }} width={width} height={height} 
    >
      <Path
        d={`M2 ${height}V21.3805L49.5804 2H298V${height - 20}.436L252.423 ${height}H2Z`}
        
        fill="url(#paint0_linear_2_171)"
        fillOpacity={0.57}
        stroke="#8FFFFF"
        strokeWidth={4}
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_2_171"
          x1={150}
          y1={2}
          x2={150}
          y2={165}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#139991" stopOpacity={0} />
          <Stop offset={1} stopColor="#139991" />
        </LinearGradient>
      </Defs>
    </Svg>
  </View>
);
