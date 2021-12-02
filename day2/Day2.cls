public class Day2 {
    public static Integer challenge1 (List<String> input) {
        Integer horizontal = 0;
        Integer vertical = 0;

        for (String line : input) {
            String[] split = line.split(" ");
            switch on split[0] {
                when 'forward' {
                    horizontal += Integer.valueOf(split[1]);
                }
                when 'up' {
                    vertical -= Integer.valueOf(split[1])
                }
                when 'down' {
                    vertical += Integer.valueOf(split[1])
                }
            }
        }

        return horizontal * vertical;
    }

    public static Integer challenge2 (List<String> input) {
        Integer horizontal = 0;
        Integer vertical = 0;
        Integer aim = 0;

        for (String line : input) {
            String[] split = line.split(" ");
            switch on split[0] {
                when 'forward' {
                    horizontal += Integer.valueOf(split[1]);
                    vertical += aim * Integer.valueOf(split[1]);
                }
                when 'up' {
                    aim -= Integer.valueOf(split[1])
                }
                when 'down' {
                    aim += Integer.valueOf(split[1])
                }
            }
        }

        return horizontal * vertical;
    }
}
