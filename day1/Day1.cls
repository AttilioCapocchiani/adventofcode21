public static Integer challenge1 (List<Integer> input) {
    Integer result = 0;

    for (Integer i = 0; i < input.size(); i++) {
        if (i > 0 && input[i] > input[i - 1]) {
            result++;
        }
    }

    return result;
}

public static Integer challenge2 (List<Integer> input) {
    Integer result = 0;

    for (Integer i = 0; i < input.size(); i++) {
        if (i > 2 && input[i] + input[i - 1] + input[i - 2] > input[i - 1] + input[i - 2] + input[i - 3]) {
            result++;
        }
    }

    return result;
}