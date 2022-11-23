import os
import json
import ast
from cognitive_complexity.api import get_cognitive_complexity

process = os.popen('multimetric tmp/submission.py')
preprocessed = process.read()
process.close

process_two = os.popen('pylint tmp/submission.py')
preprocessed_two = process_two.read()
process_two.close

with open('tmp/submission.py', 'r') as f:
    file_list = f.readlines()

file_contents = ''.join(file_list)
# print(file_contents)
tryout = ast.parse(file_contents).body[0]
cognitive_result = get_cognitive_complexity(tryout)
preprocessed_two_split_list = preprocessed_two.splitlines()
#target_line_two = preprocessed_two_split_list[7]
target_line_two = 'Your code'
result_test = list(filter(lambda x: x.startswith(target_line_two), preprocessed_two_split_list))
result_test = list(filter(lambda x: target_line_two in x, preprocessed_two_split_list))
#print('This is a test:', result_test)
#print('Length of array: ', len(preprocessed_two_split_list))
print('Total score of your code: ', result_test)
#print(target_line_two)
#print('The cognitive complexity is:{}'.format(cognitive_result) + "\n")
print(format(cognitive_result))
json_data = json.loads(preprocessed)
find_loc = json_data.get('overall', {}).get('loc')
find_vocab = json_data.get('overall', {}).get('halstead_volume')
find_conflow = json_data.get('overall', {}).get('cyclomatic_complexity')
#find_dataflow = get_cognitive_complexity(tryout)

#print(type(json_data))

#print("The LOC is:" + str(find_loc) + "\n")
print(str(find_loc))
#print("The Halstead Volume is: " + str(find_vocab) + "\n")
print(str(find_vocab))
#print("The Cyclomatic Complexity is: " + str(find_conflow) + "\n")
print(str(find_conflow))


target_line = preprocessed_two_split_list[1]
target_line_split_list = target_line.split(':')

print('linenum:{}, warning_id:{}, warning_message:{}'.format(target_line_split_list[1], target_line_split_list[3], target_line_split_list[4]))
